import mongoose from "mongoose";
const { Schema } = mongoose;

const numberQuestionSchema = new Schema({
  min: Number,
});

const NumberQuestion = mongoose.model("NumberQuestion", numberQuestionSchema);

export default NumberQuestion;
