var express = require('express');
const path = require('path');
global.bodyParser = require('body-parser');
const expressValidator = require("express-validator");
const passport = require("passport");
var mongodb = require('mongodb');
global.mongoose = require('mongoose');

global.app = express();

//Body-parser
global.app.use(global.bodyParser.json(), global.bodyParser.urlencoded({ extended: true }));


//Routes
var home = require('./routes/home.js');
var ask = require('./routes/ask.js');
var questionPage = require('./routes/question-page.js');
var forum = require('./routes/forum.js');
var ranking = require('./routes/ranking.js');
var profile = require('./routes/profile.js');


// var connect = require('./connect.js')

//Schemas
global.usertestSchema = require('./model/schemas/userTest.schema.js');

//Controller
global.registerUserController = require('./controller/user.controller.js');

//global.registerUserController.registerUser(req, res);



// PORT
const port = process.env.PORT;
global.app.listen(port, function(){
    console.log(`Listening on https://weez-api-iminyourcode.c9users.io`)
});