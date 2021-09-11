import { Request, Response } from "express";
const express = require("express");
const router = express.Router();

router.get("/", function (req: Request, res: Response) {
  console.log(req);
  res.send("Hello world!");
});

module.exports = router;
