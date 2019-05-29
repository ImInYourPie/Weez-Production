const express = require("express");
const router = express.Router();
const questionController = require("../controller/question.controller.js");
const CommentsController = require("../controller/comment.controller");
const TagsPolicy = require("../policies/tags.policy");
const CommentsPolicy = require("../policies/comments.policy");


router.get("/", questionController.getQuestions);

router.post('/ask', [TagsPolicy.addTag, questionController.createQuestion]);

router.delete("/question/:id/delete", questionController.deleteQuestion);

router.get("/questions/:id/:title", questionController.getQuestionById);

router.post("/question/:id/comment", [CommentsPolicy.comment, CommentsController.createComment]);

// router.get("/searchQuestion", questionController.searchQuestion)

module.exports = router;
