const express = require("express");
const router = express.Router();
const QuestionController = require("../controller/question.controller.js");
const CommentsController = require("../controller/comment.controller");
const TagsPolicy = require("../policies/tags.policy");
const TagsController = require("../controller/tags.controller");
const CommentsPolicy = require("../policies/comments.policy");
const UserController = require("../controller/user.controller")
const RecentlyViewedController = require("../controller/recentlyViewed.controller")
const WatchedQuestionController = require("../controller/watchedQuestion.controller")
const isAuthenticated = require("../policies/isAuthenticated.policy")


const test = require("../controller/teste")

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

router.get("/tags", TagsController.getTags);

router.get("/recently-viewed", isAuthenticated, RecentlyViewedController.getRecentlyViewed);

router.post("/recently-viewed", isAuthenticated, RecentlyViewedController.postRecentlyViewed);

router.get("/question/:id/watched", isAuthenticated, WatchedQuestionController.findWatchedQuestion);

router.post("/question/:id/watch", isAuthenticated, WatchedQuestionController.watchQuestion);

router.delete("/question/:id/watch", isAuthenticated, WatchedQuestionController.deleteWatchedQuestion);

router.get("/forum/watched", isAuthenticated, WatchedQuestionController.returnWatchedQuestions);


// router.post("/question/:id", test.voteQuestion);

// router.get("/searchQuestion", questionController.searchQuestion)


// router.get("/searchQuestion", questionController.searchQuestion)

module.exports = router;
