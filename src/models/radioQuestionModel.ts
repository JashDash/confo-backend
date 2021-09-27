import mongoose from "mongoose";
const { Schema } = mongoose;

interface IRadioQuestionSchema {
  label: string;
  optional: boolean;
  name: string;
  exampleInput: string;
  children: [typeof Object];
}

const radioQuestionSchema = new Schema<IRadioQuestionSchema>({
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
  children: {
    type: [Object],
  },
});

const RadioQuestion = mongoose.model<IRadioQuestionSchema>(
  "radio",
  radioQuestionSchema
);

export default RadioQuestion;
