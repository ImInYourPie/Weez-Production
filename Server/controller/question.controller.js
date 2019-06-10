let questionSchema = require('../model/schemas/question.schema.js');
let Tag = require('../model/schemas/tag.schema.js');
let userSchema = require('../model/schemas/user.schema.js');

class QuestionController {

    static async createQuestion(req, res) {
        //Get inputs
        const title = req.body.title;
        const description = req.body.description;
        const tags = req.body.tags;
        const userId = req.body.userId;
        var experience = 100;

        let errors = false
        console.log(tags)

        if (errors) {
            res.status(500).send(errors);
        }
        else {
            // If valide create new Question
            var newQuestion = new questionSchema({
                title: title,
                description: description,
                tags: [],
                userId: userId

            });

            for (let i = 0; i < tags.length; i++) {
                newQuestion.tags.push(tags[i])
            }

            newQuestion.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    // Add 100xp to User experience
                    userSchema.updateOne({ "_id": userId }, {
                        $inc: { "experience": experience }
                    }, (err, result) =>{
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("+100xp");
                        }
                    })
                    res.status(200).send(newQuestion);
                }
            })
        }
    };

    static getQuestions(req, res) {
        // Get data
        questionSchema.find().exec((err, questions) => {
            res.status(200).send(questions);
        })
    }

    static async getQuestionById(req, res) {
        let result = await questionSchema.findById({ _id: req.params.id }).populate("comments").populate("userId").lean();
        if (!result) return res.status(404).send({ error: "Esta pergunta já não existe ou nunca existiu, pedimos desculpa" });
        else return res.status(200).send(result);
    }

    static searchQuestion(req, res) {
        const keyword = req.body.search;
    }

    static deleteQuestion(req, res) {
        questionSchema.findByIdAndRemove({ _id: req.params.id }, (err, question) => {
            const response = {
                message: "Pergunta apagada!",
            };

            if (err) {
                return res.status(500).send(err);
            }
            else {
                return res.status(200).send(response);
            }
        });
    }


    //Vote Question
    static async voteQuestion(req, res) {

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
module.exports = QuestionController;
