const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const expressValidator = require("express-validator")
const router = express.Router();
const passport = require("passport");
const UserController = require("../controller/user.controller");
let User = require("../model/schemas/user.schema.js");


// post app to /
router.get('/', (req, res) => {
    User.find().lean().exec(function (err, users) {
        return res.end(JSON.stringify(users));
    })
});

// post app to /
router.post('/register', UserController.registerUser);


module.exports = router;