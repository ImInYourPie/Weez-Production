let RecentlyViewed = require('../model/schemas/recentlyViewed.schema.js');

class RecentlyViewedController {

    static async getRecentlyViewed(req, res) {
        try {
            const userId = req.user._id
            const viewed = await RecentlyViewed.findAll({user: userId}).sort("-date").limit(5).populate("question")
            res.status(200).send(viewed)
        } catch (error) {
            res.status(500).send({ error: "Ocorreu um erro a tentar receber as perguntas" })
        }
    }
    
    static async postRecentlyViewed(req, res) {
        try{
            const userId = req.user._id
            const {questionId} = req.body
            let newViewed = new RecentlyViewed({
                user: userId,
                question: questionId
            });
            newViewed.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    res.status(200).send(newViewed._id);
                    console.log("i came here") // lol
                }
            })
        } catch(error){
            res.status(500).send({error: "Ocorreu um erro a tentar criar histórico"})
        }
    }
    
}

module.exports = RecentlyViewedController;