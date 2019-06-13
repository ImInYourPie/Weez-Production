let questionSchema = require('../model/schemas/question.schema.js');
let Tag = require('../model/schemas/tag.schema.js');
let userSchema = require('../model/schemas/user.schema.js');

class Teste {
    static async voteQuestion(req, res) {

        var counterInc = 0;
        let voterType = null;

        // voteType is the variable name in frontend
        //check if upvote/downvote is reversed 
        if (req.body.voteType == "") {
            questionSchema.updateOne({ "_id": req.params.id }, {
                $pull: {
                    "downVotes": req.body.username
                }
            }, (err, result) => {
                console.log("Entrou")
                console.log("modified " + result.nModified)
                if (result.nModified > 0) {
                    counterInc = 1;
                    questionSchema.findOneAndUpdate({ "_id": req.params.id }, {
                        $inc: { "voteCount": counterInc }
                    }, (err, votes) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        else {
                            return res.status(200).send("Votou");
                        }
                    });
                    console.log("Tirou down")
                }
                else {
                    questionSchema.updateOne({ "_id": req.params.id }, {
                        $pull: {
                            "upVotes": req.body.username
                        }
                    }, (err, result) => {
                        if (result.nModified > 0) {
                            counterInc = -1;
                            questionSchema.findOneAndUpdate({ "_id": req.params.id }, {
                                $inc: { "voteCount": counterInc }
                            }, (err, votes) => {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    return res.status(200).send("Votou");
                                }
                            });
                            console.log("Tirou up")
                        }
                    });
                }
            });
        }

        //If the user is already in the downvotes list, it removes from it and add to the upvotes
        if (req.body.voteType == "up") {
            var  upvotes = questionSchema.upVotes
            var  downvotes = questionSchema.upVotes
            for (let i = 0; i < upvotes; i++) {
                for (let j = 0; j < downvotes; j++) {
                    //verifica se está no upvotes
                    if (req.body.username == upvotes[i]) {
                        questionSchema.updateOne({ "_id": req.params.id }, {
                            $pull: {
                                "upVotes": req.body.username // retira user do upvotes
                            }
                        }, (err, result) => {
                            counterInc = -1; //tira 1 ponto
                        });
                    }
                    //verifica se esta no array downVote
                    else if (req.body.username == downvotes[j]){
                        voterType = "upVotes" //adiciona ao upvotes
                        questionSchema.updateOne({ "_id": req.params.id }, {
                            $pull: {
                                "downVotes": req.body.username //retira user do downVotes
                            }
                        }, (err, result) => {
                            counterInc = 2; //adiciona 2 pontos
                        });
                    }
                    else {
                        voterType = "upVotes";
                        counterInc = 1; //Adiciona 1 ponto
                    }
                }
            }
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
                        $inc: { "voteCount": counterInc }
                    }, (err, votes) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        else {
                            return res.status(200).send("Votou");
                        }
                    });
                    console.log("Counter inc: " + counterInc)


                }
            });
        }
    }
}

module.exports = Teste
