const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require("express-validator");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const mongoose = require('mongoose');
const cors = require("cors");
const config = require("./config/database");
require('dotenv').config();

mongoose.connect(config.database, { useNewUrlParser: true });

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

app.use(cors());
app.use(expressValidator());
app.use(flash());
app.use(cors());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

require("./config/passport")(passport);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("*", (req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

//Routes
const home = require("./routes/home.js");
const ask = require('./routes/ask.js');
const questionPage = require("./routes/questionPage.js");
const forum = require('./routes/forum.js');
const ranking = require('./routes/ranking.js');
const profile = require('./routes/profile.js');



//Schemas
// usertestSchema = require('./model/schemas/userTest.schema.js');

//Controller
// registerUserController = require('./controller/user.controller.js');
// global.questionController = require("./controller/question.controller.js");




// Routing
app.use("/", home);
app.use("/questionPage", questionPage);
app.use("/ask", ask);
app.use("/forum", forum)


// PORT
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`https://weez-api-iminyourcode.c9users.io/`)
});