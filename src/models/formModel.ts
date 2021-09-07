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
});

const Form = mongoose.model("Form", formsSchema);

export default Form;
