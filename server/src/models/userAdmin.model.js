import mongoose from "mongoose";

const UserAdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true, 
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserAdmin", UserAdminSchema);
