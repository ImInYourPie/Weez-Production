require('dotenv').config();

module.exports = {
    database: "mongodb+srv://admin:" + process.env.DB_PASS + "@weez-wf5te.mongodb.net/test?retryWrites=true",
    secret: "baconpancakes"
}