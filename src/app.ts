const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

import { Application, Request, Response, NextFunction } from "express";
import HttpException from "./exceptions/HttpException";
import FormModel from "./models/formModel";
import NumberQuestion from "./models/numberQuestionModel";
import PhoneNumberQuestion from "./models/phoneNumberQuestionModel";
import TextQuestion from "./models/textQuestionModel";

const indexRouter = require("./routes/indexRoute");

const app: Application = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: HttpException, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(res);
});

app.listen(8000, async () => {
  if (process.env.DB && process.env.DB_PASSWORD) {
    const database = process.env.DB.replace(
      "<password>",
      process.env.DB_PASSWORD
    );
    await mongoose.connect(database, {
      useNewUrlParser: true,
    });
    console.log("Connected to database");

    // For testing purpose
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
    const form = new FormModel({
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
    let result = await FormModel.findOne({ id: form.id }).populate(
      "questions.questionId"
    );
    const util = require("util");
    console.log(util.inspect(result, false, null, true));

    // Clean up db
    await FormModel.findOneAndDelete({ id: form.id });
    await TextQuestion.findOneAndDelete({ id: textQues.id });
    await NumberQuestion.findOneAndDelete({ id: numQues.id });
    await PhoneNumberQuestion.findOneAndDelete({ id: phNoQues.id });
  } else {
    console.error("Did not find DB and/or DB_PASSWORD");
  }
});

module.exports = app;
