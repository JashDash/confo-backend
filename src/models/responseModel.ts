import mongoose from "mongoose";
const { Schema } = mongoose;

interface IResponse {
  formId: typeof mongoose.Types.ObjectId;
  fields: Object;
}

const responseSchema = new Schema<IResponse>({
  formId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  fields: {
    type: Object,
  },
});

const ResponseModel = mongoose.model<IResponse>("response", responseSchema);

export default ResponseModel;
