const Joi = require("@hapi/joi");
const commentSchema = require('../model/schemas/comment.schema.js');
const userSchema = require('../model/schemas/comment.schema.js');
const QuestionController = require("../controller/question.controller.js");
const UserController = require("../controller/user.controller.js");

class CommentController {

    static createComment(req, res) {
        //Get inputs
        const description = req.body.description;
        const { questionId } = req.params;
        const userId = req.user._id
        

        var newComment = new commentSchema({
            description: description,
            user: userId,
            question: questionId
        });

        newComment.save((err) => {
            if (err) {
                console.log(err);
                return;
            }
            else {
                res.status(201).send({ success: "Comentário adicionado!" });
            }
        })
    }


    static getComments(req, res) {
        // Get data
        commentSchema.find().exec((err, comments) => {
            res.status(200).send(comments);
        })
    }


    static deleteComment(req, res) {
        commentSchema.findByIdAndRemove({ _id: req.params.id }, (err, comment) => {
            const response = {
                message: "Comentário apagado!",
            };

            if (err) {
                return res.status(500).send(err);
            }
            else {
                return res.status(200).send(response);
            }
        });
    }
    
    //Save vote
    static async voteComment(req, res) {

        var counterInc = 0;
        var voterType = null;
        var comment = null;


        commentSchema.find({ "_id": req.params.id }, (err, result) => {

            //Receives up from frontend
            if (req.body.voteType == "up") {
                console.log(result[0].upVotes)
                comment = result[0];

                for (var i = 0; i <= comment.upVotes.length; i++) {
                    console.log(comment)
                    if (req.body.username == comment.upVotes[i]) {
                        commentSchema.updateOne({ "_id": req.params.id }, {
                            $pull: {
                                "upVotes": req.body.username
                            }
                        }, (err, result) => {
                            console.log("Retirou username")
                        });
                    }
                    else if ((i === comment.upVotes.length - 1) && (req.body.username != comment.upVotes[i])) {
                        voterType = "upVotes";
                        console.log("Adicionou username ao upVotes")
                    }
                    else if(comment.upVotes == ""){
                        voterType = "upVotes";
                        counterInc = -1;
                        console.log("Adicionou username ao upVotes")
                    }
                }

                for (var i = 0; i < comment.downVotes.length; i++) {
                    if (req.body.username == comment.downVotes[i]) {
                        voterType = "upVotes";
                        commentSchema.updateOne({ "_id": req.params.id }, {
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
                    commentSchema.updateOne({ "_id": req.params.id }, {
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
                comment = result[0];

                for (var i = 0; i <= comment.downVotes.length; i++) {
                    console.log(comment)
                    if (req.body.username == comment.downVotes[i]) {
                        commentSchema.updateOne({ "_id": req.params.id }, {
                            $pull: {
                                "downVotes": req.body.username
                            }
                        }, (err, result) => {
                            console.log("Retirou username")
                        });
                    }
                    else if ((i === comment.downVotes.length - 1) && (req.body.username != comment.downVotes[i])) {
                        voterType = "downVotes";
                        console.log("Adicionou username ao downVotes")
                    }
                    else if(comment.downVotes == ""){
                        voterType = "downVotes";
                        counterInc = -1;
                        console.log("Adicionou username ao downVotes")
                    }
                }

                for (var i = 0; i < comment.upVotes.length; i++) {
                    if (req.body.username == comment.upVotes[i]) {
                        voterType = "downVotes";
                        commentSchema.updateOne({ "_id": req.params.id }, {
                            $pull: {
                                "upVotes": req.body.username
                            }
                        }, (err, result) => {
                            console.log("Tirou do upVotes e pos no downVotes")
                        });
                    }
                }

                if (req.body.voteType != "") {
                    commentSchema.updateOne({ "_id": req.params.id }, {
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



module.exports = CommentController;