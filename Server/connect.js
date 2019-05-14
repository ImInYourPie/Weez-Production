//Server Connection
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:<admin123>@weez-wf5te.mongodb.net/test";

MongoClient.connect(uri, function(err, db) {
    db.close();
});






