let questionSchema = require('../model/schemas/question.schema.js');

class Votes {
    static async vote(req, res) {

        var counterInc = 0;
        let voterType = null;

        // voteType is the variable name in frontend
        //check if upvote/downvote is reversed 
        if (req.body.voteType == "") {
            questionSchema.updateOne({ "_id": req.params.id }, {
                $pull: {
                    "downVotes": req.body.username //username in cookies
                }
            }, (err, result) => {
                console.log("Entrou")
                console.log("modified " + result.nModified)
                if (result.nModified > 0) {
                    questionSchema.updateOne({ "_id": req.params.id }, {
                        $inc: {
                            voteCount: 1
                        }
                    });
                }
                else {
                    questionSchema.updateOne({ "_id": req.params.id }, {
                        $pull: {
                            "upVotes": req.body.username
                        }
                    }, (err, result) => {
                        if (result.nModified > 0) {
                            questionSchema.updateOne({ "_id": req.params.id }, {
                                $inc: {
                                    voteCount: -1
                                }
                            });
                        }
                    });
                }

            });
        }

        //If the user is already in the downvotes list, it removes from it and add to the upvotes
        if (req.body.voteType == "up") {
            
            console.log("up")
            voterType = "upVotes"
            questionSchema.updateOne({ "_id": req.params.id }, {
                $pull: {
                    "downVotes": req.body.username
                }
            }, (error, result) => {
                if (result.nModified > 0) {
                    counterInc = 2;
                }
                else {
                    counterInc = 1;
                }
            });
        }

        //If the user is already in the upvotes list, it removes from it and add to the downvotes
        if (req.body.voteType == "down") {
            voterType = "downVotes"
            questionSchema.updateOne({ "_id": req.params.id }, {
                $pull: {
                    "upVotes": req.body.username
                }
            }, (error, result) => {
                if (result.nModified > 0) {
                    counterInc = -2;
                }
                else {
                    counterInc = -1;
                }
            });
        }
        
        if (req.body.voteType != "") {
            console.log("1: " + counterInc)
            questionSchema.updateOne({ "_id": req.params.id }, {
                $addToSet: {
                    [voterType]: req.body.username
                }
            }, (err, result) => {
                if (result.nModified > 0) {
                    console.log("Entrou no modified")
                    questionSchema.findOneAndUpdate({ "_id": req.params.id }, {
                        $inc: { "voteCount": counterInc }, new: true
                    });
                    console.log("Counter inc: " + counterInc)
                    
                }
            });
        }
        //schema undefined?
        res.send()
    }
}

module.exports = Votes;