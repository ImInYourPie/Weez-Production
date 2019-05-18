// let Question = require('../model/schemas/question.schema.js');

class QuestionController {
    
    static createQuestion(req, res) {
        //Get inputs
        const title = req.body.title;
        const desc = req.body.desc;
        const tag = req.body.tag;

        //Validate inputs
        req.checkBody("title", "É necessário inserir o título da pergunta.").isEmpty();
        req.checkBody("desc", "É necessário inserir a descrição da pergunta.").isEmpty();
        req.checkBody("tag", "É necessário inserir pelo menos uma tag.").isEmpty();

        // If valide create new User
        var newQuestion = {
            title: title,
            desc: desc,
            tag: tag
        };
        var newQuestionString = JSON.stringify(newQuestion);
        console.log("Question:" + newQuestionString);

    }
}


module.exports = QuestionController;
