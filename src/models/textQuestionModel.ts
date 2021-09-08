import mongoose from "mongoose";
const { Schema } = mongoose;

const textQuestionSchema = new Schema({
  label: String,
});

const TextQuestion = mongoose.model("TextQuestion", textQuestionSchema);

export default TextQuestion;
