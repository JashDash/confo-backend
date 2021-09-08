import mongoose from "mongoose";
const { Schema } = mongoose;

enum ThemeChoices {
  "BLUE",
  "GREEN",
  "DARK",
}

const questionSchema = new Schema(
  {
    questionType: {
      type: String,
      required: true,
      enum: ["TextQuestion", "NumberQuestion"],
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

const formsSchema = new Schema({
  disableEditResponses: {
    type: Boolean,
  },
  chatTheme: {
    type: String,
    enum: ThemeChoices,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  questions: [questionSchema],
});

const Form = mongoose.model("Form", formsSchema);

export default Form;
