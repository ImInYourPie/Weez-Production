const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const expressValidator = require("express-validator")
const router = express.Router();
const passport = require("passport");
const UserController = require("../controller/user.controller");
let User = require("../model/schemas/user.schema.js");
let Question = require("../model/schemas/question.schema.js");


// post app to /
router.get('/', UserController.returnUsers ,(req, res) => {
    // User.find().lean().exec(function (err, users) {
    //     return res.end(JSON.stringify(users));
    // })



});

// post app to /
router.post('/register', UserController.registerUser);

router.post("/login", UserController.login, (req, res, next) => {
    res.send(req.user.username);
});


module.exports = router;