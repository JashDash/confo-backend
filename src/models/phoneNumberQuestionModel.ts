import mongoose from "mongoose";
const { Schema } = mongoose;

const phoneNumberQuestionSchema = new Schema({
  "cf-questions": {
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
  validateByOtp: {
    type: Boolean,
    default: false,
  },
});

const PhoneNumberQuestion = mongoose.model(
  "PhoneNumberQuestion",
  phoneNumberQuestionSchema
);

export default PhoneNumberQuestion;
