import mongoose from "mongoose";
const { Schema } = mongoose;

interface ICheckboxQuestionSchema {
  label: string;
  optional: boolean;
  name: string;
  exampleInput: string;
  children: [typeof Object];
}

const checkboxQuestionSchema = new Schema<ICheckboxQuestionSchema>({
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

const CheckboxQuestion = mongoose.model<ICheckboxQuestionSchema>(
  "checkbox",
  checkboxQuestionSchema
);

export default CheckboxQuestion;
