const Joi = require("@hapi/joi");
const commentSchema = require('../model/schemas/comment.schema.js');
const QuestionController = require("../controller/question.controller.js");
const UserController = require("../controller/user.controller.js");

class CommentController {

    static createComment(req, res) {
        //Get inputs
        const { description } = req.body;
        

        var newComment = new commentSchema({
            description: description,
            
        });

        newComment.save((err) => {
            if (err) {
                console.log(err);
                return;
            }
            else {
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
}



module.exports = CommentController;