const MongoClient = require('mongodb').MongoClient;

// const uri = "mongodb+srv://teste:<teste12345>@weez-yes3v.mongodb.net/test?retryWrites=true";

const uri = "mongodb+srv://admin:<password>@weez-wf5te.mongodb.net/test";

MongoClient.connect(uri, function(err, db) {
    db.close();
});








// const mysql = require('mysql');
// const db = mysql.createConnection({
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASS,
//     database: DB_NAME,
//     port: DB_PORT
// });

// module.exports = db;