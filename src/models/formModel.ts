import mongoose from "mongoose";
const { Schema } = mongoose;

enum ThemeChoices {
  "BLUE",
  "GREEN",
  "DARK",
}

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
  questions: [
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
  ],
});

const Form = mongoose.model("Form", formsSchema);

export default Form;
