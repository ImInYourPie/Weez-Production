let WatchedQuestion = require('../model/schemas/watchedQuestions.schema.js');

class WatchedQuestionController {

    static async returnWatchedQuestions(req, res){
        const watchedQuestions = await WatchedQuestion.find({user: req.user._id}).populate("question");
        res.status(200).send(watchedQuestions);
    }

    static async findWatchedQuestion(req, res, next){
        const questionId = req.body.questionId;
        const isWatched = await WatchedQuestion.find({question: questionId});
        res.status(200).send(isWatched);
        next();
    }

    static watchQuestion(req, res) {
        try{
            const userId = req.user._id
            const {questionId} = req.body
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
        
            const result = await WatchedQuestion.findByIdAndDelete(questionId);

            res.status(200).send({message: "Deixou de seguir a pergunta"})

        } catch(error){
            res.status(500).send({error: "Ocorreu um erro a tentar deixar de seguir a pergunta"})
        }
    }
}

module.exports = WatchedQuestionController;