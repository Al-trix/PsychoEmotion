import ResponseSurvey from "../models/survey.model.js";
import AnalysisSurvey from "../models/analysis.model.js";
import { createAccessToken } from "../libs/jwt.js";
import { analyzeSurveys } from "../libs/analysis.js";
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
export const surveyResponsePost = async (req, res) => {
  const { userId, surveyResponse } = req.body;
  try {
    const newSurveyResponse = new ResponseSurvey({
      userId,
      surveyResponse,
    });
    const surveyResponsedSaved = await newSurveyResponse.save();

    res.json({
      id: surveyResponsedSaved.userId,
      survey: surveyResponsedSaved.surveyResponse,
    });
  } catch (err) {
    console.log(err);
    res.status(404);
  }
};

export const surveyResponseGet = async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) return res.status(400).json({ message: "Not send user" });
    const foundSurvey = await ResponseSurvey.findOne({ userId });
    if (!foundSurvey)
      return res.status(400).json({ message: "Not found user" });
    const token = await createAccessToken({ id: foundSurvey.userId });
    res.cookie("token", token);

    res.json({
      response: foundSurvey,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTokenCookie = async (req, res) => {
  const { userId } = req.body;

  const token = await createAccessToken({ id: userId });
  res.cookie("token", token);

  res.sendStatus(202);
};

export const surveyResponseLogout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  return res.sendStatus(200);
};

export const analysisSurvey = async (req, res) => {
  try {
    const userId = req.user.id;
    const foundAnalysisCreate = [];
    if (!userId)
      return res.status(400).json({ message: "Not found user token" });

    const foundSurvey = await ResponseSurvey.findOne({
      userId,
    });
    if (!foundSurvey)
      return res.status(400).json({ message: "Not found user" });

    const foundAnalysis = await AnalysisSurvey.find({
      userId,
    });

    if (foundAnalysis.length)
      return res.status(400).json({ message: "Analysis ya creado" });

    const surveyAnalysis = await analyzeSurveys(foundSurvey.surveyResponse);
    if (surveyAnalysis.message) return res.status(500).json(surveyAnalysis);

    for (const analysis of surveyAnalysis) {
      const { question, response, sentimentAnalysis, personalityAnalysis } =
        analysis;

      const newAnalysisSurvey = new AnalysisSurvey({
        question,
        response,
        sentimentAnalysis,
        personalityAnalysis,
        userId,
      });

      const savedAnalysis = await newAnalysisSurvey.save();
      foundAnalysisCreate.push(savedAnalysis); // Solo agregamos savedAnalysis
    }
    res.json({ foundAnalysisCreate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const validateToken = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    try {
      const foundAnalysis = await AnalysisSurvey.find({
        userId: user.id,
      });

      if (!foundAnalysis)
        return res.status(401).json({ message: "Unauthorized" });

      res.json({ foundAnalysis });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};
