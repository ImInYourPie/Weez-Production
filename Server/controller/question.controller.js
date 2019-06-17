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
                newQuestion.tags.push(tags[i].name)
            }

            newQuestion.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    res.status(200).send(newQuestion._id);
                    console.log("i came here")
                }
            })
        }
    };

    static async getQuestions(req, res) {
        try {
            let questions = null;
            const search = req.query.search;
            if (search) {
                questions = await questionSchema
                    .find().or([{ title: new RegExp(search, "i") }, { tags: new RegExp(search, "i") }])
                    .populate("userId", "-email -password")
                    .lean();
            }
            else {
                questions = await questionSchema.find().populate("userId", "-email -password").lean();
            }
            res.status(200).send(questions);
        }
        catch (error) {
            res.status(500).send({ error: "Ocorreu um erro a tentar receber as perguntas" })
        }

    }

    static async getQuestionById(req, res) {
        let result = await questionSchema.findById({ _id: req.params.id }).populate("comments").populate("userId").lean();
        if (!result) return res.status(404).send({ error: "Esta pergunta já não existe ou nunca existiu, pedimos desculpa" })
        else return res.status(200).send(result);
    }

    static async returnByTitle(req, res) {
        console.log(req.body.title)
        const title = req.body.title;
        let result = await questionSchema.find({ title: new RegExp(title, "i")}).populate("userId").lean();
        if (result) return res.status(200).send(result);
        else return res.status(404).send({message: "Não foram encontradas nenhumas perguntas"});
        
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

    static async upVoteQuestion(req, res) {
        
        const userId = req.user._id;
        
        var counterInc = 0;
        var voterType = null;
        var question = null;

        console.log("upVotes")

        questionSchema.find({ "_id": req.params.id }, (err, result) => {
            //Receives up from frontend
            if (req.body.voteType == "up") {
                console.log(result[0].upVotes)
                question = result[0];

                for (var i = 0; i <= question.upVotes.length; i++) {
                    console.log(question)
                    if (userId == question.upVotes[i]) {
                        questionSchema.updateOne({ "_id": req.params.id }, {
                            $pull: {
                                "upVotes": userId
                            }
                        }, (err, result) => {
                            console.log("Retirou username")
                        });
                    }
                    else if ((i === question.upVotes.length - 1) && (userId != question.upVotes[i])) {
                        voterType = "upVotes";
                        console.log("Adicionou username ao upVotes")
                    }
                    else if (question.upVotes == "") {
                        voterType = "upVotes";
                        counterInc = -1;
                        console.log("Adicionou username ao upVotes")
                    }
                }

                for (var i = 0; i < question.downVotes.length; i++) {
                    if (userId == question.downVotes[i]) {
                        voterType = "upVotes";
                        questionSchema.updateOne({ "_id": req.params.id }, {
                            $pull: {
                                "downVotes": userId
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
                            [voterType]: userId
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


    //Vote Question
    static async downVoteQuestion(req, res) {
        
        const userId = req.user._id;

        var counterInc = 0;
        var voterType = null;
        var question = null;

        console.log("downVotes")
        questionSchema.find({ "_id": req.params.id }, (err, result) => {

            //Receives down from frontend
            if (req.body.voteType == "down") {
                console.log(result[0].downVotes)
                question = result[0];

                for (var i = 0; i <= question.downVotes.length; i++) {
                    console.log(question)
                    if (userId == question.downVotes[i]) {
                        questionSchema.updateOne({ "_id": req.params.id }, {
                            $pull: {
                                "downVotes": userId
                            }
                        }, (err, result) => {
                            console.log("Retirou username")
                        });
                    }
                    else if ((i === question.downVotes.length - 1) && (userId != question.downVotes[i])) {
                        voterType = "downVotes";
                        console.log("Adicionou username ao downVotes")
                    }
                    else if (question.downVotes == "") {
                        voterType = "downVotes";
                        counterInc = -1;
                        console.log("Adicionou username ao downVotes")
                    }
                }

                for (var i = 0; i < question.upVotes.length; i++) {
                    if (userId == question.upVotes[i]) {
                        voterType = "downVotes";
                        questionSchema.updateOne({ "_id": req.params.id }, {
                            $pull: {
                                "upVotes": userId
                            }
                        }, (err, result) => {
                            console.log("Tirou do upVotes e pos no downVotes")
                        });
                    }
                }

                if (req.body.voteType != "") {
                    questionSchema.updateOne({ "_id": req.params.id }, {
                        $addToSet: {
                            [voterType]: userId
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
module.exports = QuestionController;
