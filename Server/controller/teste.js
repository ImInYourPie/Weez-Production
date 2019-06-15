let questionSchema = require('../model/schemas/question.schema.js');
let Tag = require('../model/schemas/tag.schema.js');
let userSchema = require('../model/schemas/user.schema.js');

class Teste {
    static async voteQuestion(req, res) {

        var counterInc = 0;
        var voterType = null;
        var question = null;


        questionSchema.find({ "_id": req.params.id }, (err, result) => {

            //Receives up from frontend
            if (req.body.voteType == "up") {
                console.log(result[0].upVotes)
                question = result[0];

                for (var i = 0; i <= question.upVotes.length; i++) {
                    console.log(question)
                    if (req.body.username == question.upVotes[i]) {
                        questionSchema.updateOne({ "_id": req.params.id }, {
                            $pull: {
                                "upVotes": req.body.username
                            }
                        }, (err, result) => {
                            console.log("Retirou username")
                        });
                    }
                    else if ((i === question.upVotes.length - 1) && (req.body.username != question.upVotes[i])) {
                        voterType = "upVotes";
                        console.log("Adicionou username ao upVotes")
                    }
                    else if(question.upVotes == ""){
                        voterType = "upVotes";
                        counterInc = -1;
                        console.log("Adicionou username ao upVotes")
                    }
                }

                for (var i = 0; i < question.downVotes.length; i++) {
                    if (req.body.username == question.downVotes[i]) {
                        voterType = "upVotes";
                        questionSchema.updateOne({ "_id": req.params.id }, {
                            $pull: {
                                "downVotes": req.body.username
                            }
                        }, (err, result) => {
                            counterInc = 2;
                            console.log("Tirou do downVotes e pos no upVotes")
                        });
                    }
                }

                if (req.body.voteType != "") {
                    questionSchema.updateOne({ "_id": req.params.id }, {
                        $addToSet: {
                            [voterType]: req.body.username
                        }
                    }, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        else {
                            return res.status(200).send("Votou");
                        }
                    });
                }
            }

            //Receives down from frontend
            else if (req.body.voteType == "down") {
                console.log(result[0].downVotes)
                question = result[0];

                for (var i = 0; i <= question.downVotes.length; i++) {
                    console.log(question)
                    if (req.body.username == question.downVotes[i]) {
                        questionSchema.updateOne({ "_id": req.params.id }, {
                            $pull: {
                                "downVotes": req.body.username
                            }
                        }, (err, result) => {
                            console.log("Retirou username")
                        });
                    }
                    else if ((i === question.downVotes.length - 1) && (req.body.username != question.downVotes[i])) {
                        voterType = "downVotes";
                        console.log("Adicionou username ao downVotes")
                    }
                    else if(question.downVotes == ""){
                        voterType = "downVotes";
                        counterInc = -1;
                        console.log("Adicionou username ao downVotes")
                    }
                }

                for (var i = 0; i < question.upVotes.length; i++) {
                    if (req.body.username == question.upVotes[i]) {
                        voterType = "downVotes";
                        questionSchema.updateOne({ "_id": req.params.id }, {
                            $pull: {
                                "upVotes": req.body.username
                            }
                        }, (err, result) => {
                            console.log("Tirou do upVotes e pos no downVotes")
                        });
                    }
                }

                if (req.body.voteType != "") {
                    questionSchema.updateOne({ "_id": req.params.id }, {
                        $addToSet: {
                            [voterType]: req.body.username
                        }
                    }, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        else {
                            return res.status(200).send("Votou");
                        }

                    });
                }
            }
        })
    }
}


module.exports = Teste
