const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require("express-validator");
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require("cors");
const config = require("./config/database");
require('dotenv').config();

mongoose.connect(config.database, { useNewUrlParser: true, useFindAndModify: false });

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


require("./passport")


//Routes
const home = require("./routes/home.js");
const forum = require('./routes/forum.js');
const ranking = require('./routes/ranking.js');
const profile = require('./routes/profile.js');

// Routing
app.use("/", home);
app.use("/forum", forum);
app.use("/profile", profile);
app.use("/ranking", ranking);


// PORT
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`https://weez-api-iminyourcode.c9users.io/`)
});