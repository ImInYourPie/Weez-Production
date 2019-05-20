const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const expressValidator = require("express-validator")
const router = express.Router();
const passport = require("passport");
let Question = require('../model/schemas/question.schema.js');
const questionController = require("../controller/question.controller.js");



module.exports = router;