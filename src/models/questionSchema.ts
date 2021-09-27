import mongoose from "mongoose";
const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    questionType: {
      type: String,
      required: true,
      enum: ["text", "number", "tel", "email", "radio"],
    },
    questionId: {
      type: mongoose.Types.ObjectId,
      required: true,
      refPath: "questions.questionType",
    },
  },
  {
    _id: false,
  }
);

export default questionSchema;
