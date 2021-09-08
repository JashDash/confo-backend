import Form from "../models/formModel";
import NumberQuestion from "../models/numberQuestionModel";
import PhoneNumberQuestion from "../models/phoneNumberQuestionModel";
import TextQuestion from "../models/textQuestionModel";

// For testing purpose
const test = async () => {
  // Subdocuments
  const numQues = new NumberQuestion({
    label: "Please enter your age",
    name: "age",
    exampleInput: "18, 21",
    min: 10,
    max: 12,
  });
  await numQues.save();

  const textQues = new TextQuestion({
    label: "Please enter your name",
    name: "fullname",
    exampleInput: "John, Mark",
  });
  await textQues.save();

  const phNoQues = new PhoneNumberQuestion({
    label: "Please enter your phone number",
    name: "phone",
    exampleInput: "8146333589, 9530704884",
    validateByOtp: true,
  });
  await phNoQues.save();

  // Form
  const form = new Form({
    name: "My form",
    chatTheme: "BLUE",
    questions: [
      { questionType: "TextQuestion", questionId: textQues.id },
      { questionType: "NumberQuestion", questionId: numQues.id },
      { questionType: "PhoneNumberQuestion", questionId: phNoQues.id },
    ],
  });
  await form.save();

  // Populate
  let result = await Form.findOne({ id: form.id }).populate(
    "questions.questionId"
  );
  const util = require("util");
  console.log(util.inspect(result, false, null, true));

  // Clean up db
  await Form.findOneAndDelete({ id: form.id });
  await TextQuestion.findOneAndDelete({ id: textQues.id });
  await NumberQuestion.findOneAndDelete({ id: numQues.id });
  await PhoneNumberQuestion.findOneAndDelete({ id: phNoQues.id });
};

export default test;
