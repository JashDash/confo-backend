import mongoose from "mongoose";
const { Schema } = mongoose;

interface IFileQuestionSchema {
  label: string;
  optional: boolean;
  name: string;
  exampleInput: string;
}

const fileQuestionSchema = new Schema<IFileQuestionSchema>({
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

const FileQuestion = mongoose.model<IFileQuestionSchema>(
  "file",
  fileQuestionSchema
);

export default FileQuestion;
