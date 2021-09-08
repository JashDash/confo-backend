import mongoose from "mongoose";
const { Schema } = mongoose;

const textQuestionSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    required: true,
  },
  optional: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  exampleInput: {
    type: String,
    default: "",
  },
});

const TextQuestion = mongoose.model("TextQuestion", textQuestionSchema);

export default TextQuestion;
