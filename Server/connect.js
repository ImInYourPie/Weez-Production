const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:" + process.env.DB_PASS +"@weez-wf5te.mongodb.net/test?retryWrites=true");

