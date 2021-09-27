import mongoose from "mongoose";
const { Schema } = mongoose;

const responseSchema = new Schema({
  formId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  fields: {
    type: Object,
  },
});

const ResponseModel = mongoose.model("response", responseSchema);

export default ResponseModel;
