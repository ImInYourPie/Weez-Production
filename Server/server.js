const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require("express-validator");
const flash = require('connect-flash');
const mongoose = require('mongoose');
const cors = require("cors");
const config = require("./config/database");
if(process.env.NODE_ENV !== "production") require('dotenv').config();

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

// Handle production build
if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => { res.sendFile(__dirname + '/public/index.html') });
}


// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});