const express = require("express");
const router = express.Router();
const QuestionController = require("../controller/question.controller.js");
const CommentsController = require("../controller/comment.controller");
const TagsPolicy = require("../policies/tags.policy");
const TagsController = require("../controller/tags.controller");
const CommentsPolicy = require("../policies/comments.policy");
const Tag = require("../model/schemas/tag.schema")
const UserController = require("../controller/user.controller")




router.get("/", QuestionController.getQuestions); // returns questions from db

router.get("/ask", [TagsController.getTags, QuestionController.getQuestions]); // return tags and questions from db

router.post('/ask', TagsPolicy.addTag, QuestionController.createQuestion); // validates new tags and saves them on db, then posts new question on db

router.delete("/question/:id/delete", QuestionController.deleteQuestion); // deletes question from db by id

router.get("/question/:id", QuestionController.getQuestionById); // returns a question from db by id

router.post("/question/:id/vote", QuestionController.voteQuestion);

router.post("/question/:id/comment", [CommentsPolicy.comment, CommentsController.createComment]); // validates new comment, then saves comment on db

router.delete("/question/:id/comment/:commentId/delete", CommentsController.deleteComment); // deletes comment from db by id

router.post("/question/:id/comment/:commentId/vote", CommentsController.voteComment);

router.get('/users', UserController.returnUsers);



router.get("/tags", TagsController.getTags)

// router.get("/searchQuestion", questionController.searchQuestion)

module.exports = router;
