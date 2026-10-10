import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },

    role: {
      type: String,
      enum: ["frontend", "backend", "fullstack", "designer", "ml", "security", "other"],
      default: "other",
    },
    skills: { type: [String], default: [] },
    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    bio: { type: String, maxlength: 300, default: "" },
    github: { type: String, trim: true, default: "" },
    lookingFor: { type: String, maxlength: 200, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);