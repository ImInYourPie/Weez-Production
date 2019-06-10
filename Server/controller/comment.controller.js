const Joi = require("@hapi/joi");
const commentSchema = require('../model/schemas/comment.schema.js');
const userSchema = require('../model/schemas/comment.schema.js');
const QuestionController = require("../controller/question.controller.js");
const UserController = require("../controller/user.controller.js");

class CommentController {

    static createComment(req, res) {
        //Get inputs
        const { description } = req.body;
        // const userId = req.body.userId
        // var experience = 50;
        

        var newComment = new commentSchema({
            description: description,
            
        });

        newComment.save((err) => {
            if (err) {
                console.log(err);
                return;
            }
            else {
                /*// Add 50xp to User experience
                    userSchema.updateOne({ "_id": userId }, {
                        $inc: { "experience": experience }
                    }, (err, result) =>{
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("+50xp");
                        }
                    })*/
                res.status(200).send({ success: "Comentário adicionado!" });
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
    
    
    static async voteComment(req, res) {

        var counterInc = 0;
        let voterType = null;

        // voteType is the variable name in frontend
        //check if upvote/downvote is reversed 
        if (req.body.voteType == "") {
            commentSchema.updateOne({ "_id": req.params.commentId }, {
                $pull: {
                    "downVotes": req.body.username //username in cookies
                }
            }, (err, result) => {
                console.log("Entrou")
                console.log("modified " + result.nModified)
                if (result.nModified > 0) {
                    counterInc = 1;
                    commentSchema.findOneAndUpdate({ "_id": req.params.commentId }, {
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
                    commentSchema.updateOne({ "_id": req.params.commentId }, {
                        $pull: {
                            "upVotes": req.body.username
                        }
                    }, (err, result) => {
                        if (result.nModified > 0) {
                            counterInc = -1;
                            commentSchema.findOneAndUpdate({ "_id": req.params.commentId }, {
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
            commentSchema.updateOne({ "_id": req.params.commentId }, {
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
            commentSchema.updateOne({ "_id": req.params.commentId }, {
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
            commentSchema.updateOne({ "_id": req.params.commentId }, {
                $addToSet: {
                    [voterType]: req.body.username
                }
            }, (err, result) => {
                if (result.nModified > 0) {
                    console.log("Entrou no modified")
                    commentSchema.findOneAndUpdate({ "_id": req.params.commentId }, {
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



module.exports = CommentController;