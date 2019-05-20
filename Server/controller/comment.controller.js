let Comment = require('../model/schemas/comment.schema.js');

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
            var newComment = new Comment({
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
}


module.exports = CommentController;