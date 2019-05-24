const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const expressValidator = require("express-validator")
const router = express.Router();
const passport = require("passport");
const UserController = require("../controller/user.controller");
const AuthenticationPolicy = require("../policies/authentication.policy");
let User = require("../model/schemas/user.schema.js");
let Question = require("../model/schemas/question.schema.js");


// post app to /
router.get('/', UserController.returnUsers ,(req, res) => {
    // User.find().lean().exec(function (err, users) {
    //     return res.end(JSON.stringify(users));
    // })



});

// post app to /
router.post('/register', [AuthenticationPolicy.register, UserController.register]);

router.post("/login", UserController.login);


module.exports = router;