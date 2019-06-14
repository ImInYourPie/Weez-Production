let RecentlyViewed = require('../model/schemas/recentlyViewed.schema.js');

class RecentlyViewedController {

    static async getRecentlyViewed(req, res) {
        try {
            console.log("sup")
            const userId = req.user._id
            const viewed = await RecentlyViewed.find({user: userId}).sort("-createdAt").limit(5).populate("question")
            
            res.status(200).send(viewed)
        } catch (error) {
            res.status(500).send({ error: "Ocorreu um erro a tentar receber as perguntas" })
        }
    }
    
    static postRecentlyViewed(req, res) {
        try{
            console.log("supsupsup")
            console.log("supsupsup")
            console.log("supsupsup")
            const userId = req.user._id
            const questionId = req.body.questionId

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