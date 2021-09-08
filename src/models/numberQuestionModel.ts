import mongoose from "mongoose";
const { Schema } = mongoose;

const numberQuestionSchema = new Schema({
  label: {
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
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
});

const NumberQuestion = mongoose.model("NumberQuestion", numberQuestionSchema);

export default NumberQuestion;
