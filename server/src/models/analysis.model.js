import mongoose from "mongoose";

const analysisSurveySchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
    response: {
      type: String,
      required: true,
    },
    sentimentAnalysis: {
      type: [Object],
      required: true,
    },
    personalityAnalysis: {
      type: [Object],
      required: true,
    },
    userId: {
      type: String,
      ref: "responsesurveys",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AnalysisSurvey", analysisSurveySchema);
