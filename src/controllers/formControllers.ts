import { Request, Response } from "express";
import mongoose from "mongoose";
import TextQuestion from "../models/textQuestionModel";
import Form from "../models/formModel";
import NumberQuestion from "../models/numberQuestionModel";
import PhoneNumberQuestion from "../models/phoneNumberQuestionModel";

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
    case "Text Input":
      return {
        questionType: "TextQuestion",
        questionId: await populateAndSaveQuestion(question, TextQuestion),
      };
    case "Number":
      return {
        questionType: "NumberQuestion",
        questionId: await populateAndSaveQuestion(question, NumberQuestion),
      };
    case "Phone Number":
      return {
        questionType: "PhoneNumberQuestion",
        questionId: await populateAndSaveQuestion(
          question,
          PhoneNumberQuestion
        ),
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
