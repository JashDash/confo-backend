import mongoose from "mongoose";
const { Schema } = mongoose;

interface INumberQuestionSchema {
  label: string;
  optional: boolean;
  name: string;
  exampleInput: string;
  min: number;
  max: number;
}

const numberQuestionSchema = new Schema<INumberQuestionSchema>({
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

const NumberQuestion = mongoose.model<INumberQuestionSchema>(
  "NumberQuestion",
  numberQuestionSchema
);

export default NumberQuestion;
