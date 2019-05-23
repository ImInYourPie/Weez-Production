const express = require("express");
const router = express.Router();
const questionController = require("../controller/question.controller.js");


router.get("/", questionController.getQuestions);

router.delete("/deleteQuestion", questionController.deleteQuestion);

module.exports = router;