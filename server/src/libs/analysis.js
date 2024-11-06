import axios from 'axios';
import { ACCESS_TOKEN_HF } from '../config.js';

export const analyzeSurveys = async (survey) => {
  console.log(`Bearer ${ACCESS_TOKEN_HF}`);
  try {
    // Mapping personality labels to descriptions
    const personalityLabels = {
      LABEL_0: 'Apertura',
      LABEL_1: 'Responsabilidad',
      LABEL_2: 'Extraversión',
      LABEL_3: 'Amabilidad',
      LABEL_4: 'Neuroticismo',
    };

    const generalContext = `
  Este cuestionario busca evaluar las respuestas desde varias perspectivas psicológicas: 
  la estabilidad emocional, coherencia cognitiva, rasgos de personalidad, actitud frente a situaciones específicas,
  grado de problematización y nivel de claridad/confianza. Cada respuesta debe ser analizada en función de su alineación 
  con estos factores para determinar si refleja bienestar o malestar emocional, apertura o cierre frente a nuevas experiencias, 
  y otros rasgos psicológicos relevantes.
`;

    // Ensure the survey has exactly 15 questions
    if (survey.length >= 30) {
      throw new Error('The survey must contain exactly 15 questions.');
    }

    // Prepare the input for the API request
    const inputs = survey.map((surveyData) => ({
      question: surveyData.question,
      response: surveyData.response,
      context: generalContext,
    }));

    // Sentiment analysis using the Hugging Face API
    const sentimentResult = await axios.post(
      'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
      {
        inputs: inputs.map(
          (input) =>
            `Contexto: ${input.context}\nPregunta: ${input.question}\nRespuesta: ${input.response}\nPor favor, analiza la respuesta en términos de estabilidad emocional, coherencia cognitiva y actitud frente a la pregunta.`
        ),
      },
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN_HF}` },
      }
    );

    // Personality classification using another model
    const personalityResult = await axios.post(
      'https://api-inference.huggingface.co/models/nasserelsaman/microsoft-finetuned-personality',
      {
        inputs: inputs.map(
          (input) =>
            `Contexto: ${input.context}\nRespuesta: ${input.response}\nEvalúa esta respuesta en términos de rasgos de personalidad: apertura, responsabilidad, extroversión, amabilidad y neuroticismo.`
        ),
      },
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN_HF}` },
      }
    );

    // Process the results
    const analysisResults = inputs.map((input, index) => {
      const sentimentScores = sentimentResult.data[index].map((sentiment) => ({
        label: sentiment.label,
        score: (sentiment.score * 100).toFixed(2),
      }));

      const personalityScores = personalityResult.data[index];
      const personalityAnalysis = personalityScores.map((score) => ({
        label: personalityLabels[score.label],
        score: (score.score * 100).toFixed(2),
      }));

      return {
        question: input.question,
        response: input.response,
        sentimentAnalysis: sentimentScores,
        personalityAnalysis: personalityAnalysis,
      };
    });

    return analysisResults;
  } catch (error) {
    console.log(error);

    if (error.response && error.response.status === 429) {
      return {
        message: 'Too many requests. Please wait a moment before trying again.',
      };
    } else {
      return {
        message: 'He service is loading',
        error,
      };
    }
  }
};
