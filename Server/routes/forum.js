const express = require("express");
const router = express.Router();
const questionController = require("../controller/question.controller.js");


router.get("/", questionController.getQuestions);

router.post('/createQuestion', questionController.createQuestion);

router.delete("/deleteQuestion", questionController.deleteQuestion);

// router.get("/searchQuestion", questionController.searchQuestion)

module.exports = router;
