const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const expressValidator = require("express-validator")
const router = express.Router();
const passport = require("passport");
const registerUser = require("../controller/user.controller.js");



// post app to /
router.get('/', (req, res) => {
    console.log("GET");
    res.send("GET");
    // console.log(global.registerUserController.registerUser)
});

// post app to /
router.post('/register', registerUser);


module.exports = router;