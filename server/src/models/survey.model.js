import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
    userId: {
    type: String,
    required: true,
    unique: true,
  },
  surveyResponse: {
    type: [Object],
    required: true,
    
  },
 
}, {
  timestamps: true,
});

export default mongoose.model("ResponseSurvey", surveySchema);
