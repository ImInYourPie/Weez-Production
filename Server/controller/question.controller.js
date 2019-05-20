let Question = require('../model/schemas/question.schema.js');

class QuestionController {

    static createQuestion(req, res) {
        //Get inputs
        const title = req.body.title;
        const description = req.body.description;
        // const tags = req.body.tags;

        //Validate inputs
        req.checkBody("title", "É necessário inserir o título da pergunta.").notEmpty();
        req.checkBody("description", "É necessário inserir a descrição da pergunta.").notEmpty();
        // req.checkBody("tags", "É necessário inserir pelo menos uma tag.").notEmpty();


        let errors = req.validationErrors();

        if (errors) {
            res.status(500).send(errors);
        }
        else {
            // If valide create new Question
            var newQuestion = new Question({
                title: title,
                description: description,
                // tags: tags
            });

            newQuestion.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    req.flash("success", "Pergunta criada!");
                    res.status(200).send();
                }
            })
        }
    };

    static getQuestions(req, res){
       // Get data
       Question.find().exec((err, questions) => {
        res.status(200).send(questions);
    })
    }
}


module.exports = QuestionController;
