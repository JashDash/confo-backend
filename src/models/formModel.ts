import mongoose from "mongoose";
const { Schema } = mongoose;

enum ThemeChoices {
  "BLUE",
  "GREEN",
  "DARK",
}

// TODO: add questions
interface Form {
  allowEditResponses?: boolean;
  chatTheme?: ThemeChoices;
  name: string;
  description?: string;
}

const formsSchema = new Schema<Form>({
  allowEditResponses: {
    type: Boolean,
    default: true,
  },
  chatTheme: {
    type: String,
    enum: ThemeChoices,
    default: "BLUE",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const FormModel = mongoose.model<Form>("Form", formsSchema);

export default FormModel;
