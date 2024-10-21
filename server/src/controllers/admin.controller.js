import { TOKEN_ADMIN } from "../config.js";
import Questions from "../models/questions.model.js";
export const adminToken = (req, res) => {
  const { token } = req.body;

  if (token !== TOKEN_ADMIN)
    return res
      .status(404)
      .json({ message: "Contraseña incorrecta, intentalo nuevamente " });

  return res.sendStatus(201);
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Questions.find();
    if (!questions)
      return res.status(404).json({ message: "Questions not found" });

    res.json(questions);
  } catch (err) {
    res.json({ message: err });
  }
};
export const createQuestion = async (req, res) => {
  try {
    const { num, question, bg, hover } = req.body;

    const newQuestion = new Questions({
      num,
      question,
      bg,
      hover,
    });

    const savedQuestion = await newQuestion.save();

    res.json(savedQuestion);
  } catch (err) {
    res.json({ message: err });
  }
};
export const UpdateQuestion = async (req, res) => {
  try {
    const question = await Questions.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!question)
      return res.status(404).json({ message: "Questions not found" });

    res.json(question);
  } catch (err) {
    res.json({ message: err });
  }
};
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Questions.findByIdAndDelete(req.params.id);

    if (!question)
      return res.status(404).json({ message: "Questions not found" });

    res.sendStatus(204);
  } catch (err) {
    res.json({ message: err });
  }
};
