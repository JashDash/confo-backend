import { Request, Response } from "express";
import mongoose from "mongoose";
import TextQuestion from "../models/textQuestionModel";
import Form from "../models/formModel";
import NumberQuestion from "../models/numberQuestionModel";
import PhoneNumberQuestion from "../models/phoneNumberQuestionModel";
import ResponseModel from "../models/responseModel";
import EmailQuestion from "../models/emailQuestionModel";

interface IQuestionArray {
  questionType: string;
  questionId: mongoose.Types.ObjectId | null;
}

const populateAndSaveQuestion = async (
  questionData: any,
  QuestionModel: any
): Promise<mongoose.Types.ObjectId> => {
  const question = new QuestionModel({ ...questionData });
  await question.save();
  return question.id;
};

const handleQuestion = async (question: any): Promise<IQuestionArray> => {
  const answerFormat = question.answerFormat;
  delete question.answerFormat;
  switch (answerFormat) {
    case "text":
      return {
        questionType: answerFormat,
        questionId: await populateAndSaveQuestion(question, TextQuestion),
      };
    case "number":
      return {
        questionType: answerFormat,
        questionId: await populateAndSaveQuestion(question, NumberQuestion),
      };
    case "tel":
      return {
        questionType: answerFormat,
        questionId: await populateAndSaveQuestion(
          question,
          PhoneNumberQuestion
        ),
      };
    case "email":
      return {
        questionType: answerFormat,
        questionId: await populateAndSaveQuestion(question, EmailQuestion),
      };
    default:
      return { questionType: "DEFAULT CASE", questionId: null };
  }
};

const makeQuestions = async (questions: any): Promise<IQuestionArray[]> => {
  const questionsArray: IQuestionArray[] = [];
  for (const question of questions) {
    questionsArray.push(await handleQuestion(question));
  }
  return questionsArray;
};

const makeFormFromQuestions = async (
  reqBody: any,
  questionsArray: IQuestionArray[]
) => {
  const form = new Form({
    ...reqBody,
    questions: questionsArray,
  });
  return form;
};

const postMetadata = async (req: Request, res: Response) => {
  const questionsArray: IQuestionArray[] = await makeQuestions(
    req.body.questions
  );
  const form = await makeFormFromQuestions(req.body, questionsArray);
  await form.save((err) => console.error(err));
  res.json({ formUrl: `http://localhost:3000/FormPage/${form.id}` });
};

const parseData = (metadata: any) => {
  let newQuestions: any = [];
  metadata.questions.forEach((question: any) => {
    const newQuestion = {
      type: question.questionType,
      tag: "input",
      name: question.questionId.name,
      "cf-questions": question.questionId.label,
      "cf-input-placeholder": question.questionId.exampleInput,
      required: !question.questionId.optional,
    };
    newQuestions.push(newQuestion);
  });
  return newQuestions;
};

const getMetadata = async (req: Request, res: Response) => {
  let metadata: any = await Form.findOne({ _id: req.params.id });
  metadata = await metadata.populate("questions.questionId");
  const newQuestions = parseData(metadata);
  const obj = { ...metadata._doc };
  obj.questions = newQuestions;
  res.json(obj);
};

const submitResponse = async (req: Request) => {
  let response = req.body;
  const formId: mongoose.Types.ObjectId = response.formId;
  delete response.submit;
  delete response.formId;
  const obj = {
    formId: formId,
    fields: response,
  };
  const mResponse = new ResponseModel({ ...obj });
  await mResponse.save();
  console.log(mResponse);
};

export default { postMetadata, getMetadata, submitResponse };
