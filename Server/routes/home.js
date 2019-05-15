const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");

// post app to /
router.get('/', (req, res) => {
    console.log("GET")
    res.send("GET");
    console.log(global.registerUserController.registerUser)
});

// post app to /
router.post('/register', (req, res) => {
    
});


