let Question = require('../model/schemas/question.schema.js');
let Tag = require('../model/schemas/tag.schema.js');

class QuestionController {

    static async createQuestion(req, res) {
        //Get inputs
        const title = req.body.title;
        const description = req.body.description;
        const tags = req.body.tags;

        let tagsToStore = await Tag.find({ name: { $in: tags } }).select("-description").lean();
        let errors = false
        console.log(tagsToStore)

        if (errors) {
            res.status(500).send(errors);
        }
        else {
            // If valide create new Question
            var newQuestion = new Question({
                title: title,
                description: description,
                tags: []
            });

            for (let i = 0; i < tagsToStore.length; i++) {
                newQuestion.tags.push(tagsToStore[i].name) 
            }

            newQuestion.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    res.status(200).send(newQuestion);
                }
            })
        }
    };

    static getQuestions(req, res) {
        // Get data
        Question.find().exec((err, questions) => {
            res.status(200).send(questions);
        })
    }

    static async getQuestionById(req, res) {
        let result = await Question.findById({ _id: req.params.id }).lean();
        if (!result) return res.status(404).send({ error: "Esta pergunta já não existe ou nunca existiu, pedimos desculpa" });
        else return res.status(200).send(result);
    }

    static searchQuestion(req, res) {
        const keyword = req.body.search;
    }

    static deleteQuestion(req, res) {
        Question.findByIdAndRemove({ _id: req.params.id }, (err, question) => {
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
}
module.exports = QuestionController;
