let WatchedQuestion = require('../model/schemas/watchedQuestions.schema.js');

class WatchedQuestionController {

    static async returnWatchedQuestions(req, res){
        const watchedQuestions = await WatchedQuestion.find({user: req.user._id}).populate("question");
        res.status(200).send(watchedQuestions);
    }

    static async findWatchedQuestion(req, res){
        const userId = req.user._id;
        const questionId = req.body.questionId;
        const isWatched = await WatchedQuestion.findOne({question: questionId, user: userId});
        res.status(200).send(isWatched)
    }

    static watchQuestion(req, res) {
        try{
            const userId = req.user._id
            const questionId = req.params.id
            console.log(questionId)
            let newWatched = new WatchedQuestion({
                user: userId,
                question: questionId
            });
            newWatched.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    res.status(200).send(newWatched._id);
                    console.log("i came here") // lol
                }
            })
        } catch(error){
            res.status(500).send({error: "Ocorreu um erro a tentar seguir a pergunta"})
        }
    }

    static async deleteWatchedQuestion(req, res) {
        try{

            const userId = req.user._id
            const {questionId} = req.body
            await WatchedQuestion.findOneAndDelete({question: questionId, user: userId});
            res.status(200).send({message: "Deixou de seguir a pergunta"})

        } catch(error){
            res.status(500).send({error: "Ocorreu um erro a tentar deixar de seguir a pergunta"})
        }
    }
}

module.exports = WatchedQuestionController;