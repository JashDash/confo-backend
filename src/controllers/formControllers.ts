import { Request, Response } from "express";
import mongoose from "mongoose";
import TextQuestion from "../models/textQuestionModel";
import Form from "../models/formModel";
import NumberQuestion from "../models/numberQuestionModel";

interface IQuestionArray {
  questionType: string;
  questionId: mongoose.Types.ObjectId | null;
}

const handleTextQuestion = async (
  question: any
): Promise<mongoose.Types.ObjectId> => {
  const textQuestion = new TextQuestion({ ...question });
  await textQuestion.save();
  return textQuestion.id;
};

const handleNumberQuestion = async (
  question: any
): Promise<mongoose.Types.ObjectId> => {
  const numQuestion = new NumberQuestion({ ...question });
  await numQuestion.save();
  return numQuestion.id;
};

const handleQuestion = async (question: any): Promise<IQuestionArray> => {
  const inputType = question.inputType;
  delete question.inputType;
  switch (inputType) {
    case "text":
      return {
        questionType: "TextQuestion",
        questionId: await handleTextQuestion(question),
      };
    case "number":
      return {
        questionType: "NumberQuestion",
        questionId: await handleNumberQuestion(question),
      };
    default:
      return { questionType: "NOT DEFINED", questionId: null };
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
  res.send("ok");
};

export default { postMetadata };
