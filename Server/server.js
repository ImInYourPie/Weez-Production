const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require("express-validator");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const config = require("./config/database");
require('dotenv').config();

mongoose.connect(config.database);

let db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to MongoDB Atlas");
});

db.on("error", (err) => {
    console.log(err);
});

const app = express();

//Body-parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


//Routes
const home = require('./routes/home.js');
const ask = require('./routes/ask.js');
const questionPage = require('./routes/question-page.js');
const forum = require('./routes/forum.js');
const ranking = require('./routes/ranking.js');
const profile = require('./routes/profile.js');



//Schemas
// usertestSchema = require('./model/schemas/userTest.schema.js');

//Controller
// registerUserController = require('./controller/user.controller.js');

//global.registerUserController.registerUser(req, res);



// Routing
app.use("/", home);
// app.use("/forum", forum)


// PORT
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on port `, port)
});