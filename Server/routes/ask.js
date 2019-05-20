const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const expressValidator = require("express-validator")
const router = express.Router();
const passport = require("passport");
let Comment = require('../model/schemas/comment.schema.js');
const commentController = require("../controller/comment.controller");
console.log("Comment")
router.get('/', (req, res) =>{
    res.send("GET")
})

router.post('/createComment', commentController.createComment);

module.exports = router;