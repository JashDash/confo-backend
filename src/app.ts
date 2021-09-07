const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
import { Application, Request, Response, NextFunction } from "express";
import HttpException from "./exceptions/HttpException";

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
  } else {
    console.error("Did not find DB and/or DB_PASSWORD");
  }
});

module.exports = app;
