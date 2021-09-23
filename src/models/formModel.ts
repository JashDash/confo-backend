import mongoose from "mongoose";
import questionSchema from "./questionSchema";
const { Schema } = mongoose;

enum ThemeChoices {
  "Blue",
  "Green",
  "Dark",
}

const arrayLimit = (arr: [typeof questionSchema]) => {
  return arr.length > 0;
};

const formsSchema = new Schema({
  disableEditResponses: {
    type: Boolean,
  },
  chatTheme: {
    type: String,
    enum: ThemeChoices,
  },
  formName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  questions: {
    type: [questionSchema],
    validate: arrayLimit,
  },
});

const Form = mongoose.model("Form", formsSchema);

export default Form;
