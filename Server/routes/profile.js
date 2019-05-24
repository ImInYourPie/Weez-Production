const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const expressValidator = require("express-validator")
const router = express.Router();
const passport = require("passport");
let User = require('../model/schemas/user.schema.js');
const UserController = require("../controller/user.controller.js");

router.get("/", UserController.returnUsers, (req, res) => {

});

router.put("/", UserController.returnUsers, (req, res) => {

});


module.exports = router;