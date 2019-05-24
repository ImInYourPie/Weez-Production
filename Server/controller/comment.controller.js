let commentSchema = require('../model/schemas/comment.schema.js');

class CommentController {

    static createComment(req, res) {
        //Get inputs
        const description = req.body.description;

        //Validate inputs
        req.checkBody("description", "É necessário inserir a descrição do comentário.").notEmpty();

        let errors = req.validationErrors();

        if (errors) {
            res.status(500).send(errors);
        }
        else {
            // If valide create new Comment
            var newComment = new commentSchema({
                description: description,

            });

            newComment.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    req.flash("success", "Comentário criado!");
                    res.status(200).send();
                }
            })
        }
    }
    
     static getComments(req, res) {
        // Get data
        commentSchema.find().exec((err, comments) => {
            res.status(200).send(comments);
        })
    }
    
    static deleteComment(req, res) {
        commentSchema.findByIdAndRemove({ _id: req.body.commentId }, (err, comment) => {
            const response = {
                message: "Comentário apagado!",
            };
            
            if (err) {
                return res.status(500).send(err);
            }
            else{
                return res.status(200).send(response);
            }
        });
    }
}


module.exports = CommentController;