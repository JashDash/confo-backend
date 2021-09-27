import mongoose from "mongoose";
const { Schema } = mongoose;

interface IEmailQuestionSchema {
  label: string;
  optional: boolean;
  name: string;
  exampleInput: string;
}

const emailQuestionSchema = new Schema<IEmailQuestionSchema>({
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
});

const EmailQuestion = mongoose.model<IEmailQuestionSchema>(
  "email",
  emailQuestionSchema
);

export default EmailQuestion;
