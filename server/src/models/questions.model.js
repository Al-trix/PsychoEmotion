import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
  {
    num: {
      type: String,
      required: true,
      unique: true,
    },
    question: {
      type: String,
      required: true,
    },
    bg: {
      type: String,
      required: true,
    },
    hover: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Questions", questionsSchema);
