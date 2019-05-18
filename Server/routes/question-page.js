const express = require("express");
const mongoose = require("mongoose");
const expressValidator = require("express-validator")
const router = express.Router();
const passport = require("passport");

const questionController = require("../controller/question.controller");
// let Question = require("../model/schemas/question.schema.js");


router.get('/createQuestion', (req, res) => {
    res.send("GET")
    console.log(questionController.createQuestion)
});


router.post('/createQuestion', (req, res) => {
    res.send("POST")
    questionController.createQuestion(req, res);
    console.log(questionController.createQuestion)
});

module.exports = router;