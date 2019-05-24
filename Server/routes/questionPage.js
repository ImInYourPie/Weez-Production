const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const expressValidator = require("express-validator")
const router = express.Router();
const passport = require("passport");
let Question = require('../model/schemas/question.schema.js');
const questionController = require("../controller/question.controller.js");
let commentSchema = require('../model/schemas/comment.schema.js');
const commentController = require("../controller/comment.controller.js");

router.get("/", commentController.getComments);

router.delete("/deleteComment", commentController.deleteComment);

module.exports = router;