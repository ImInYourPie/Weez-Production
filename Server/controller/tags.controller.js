let Tag = require('../model/schemas/tag.schema.js');

class TagsController {

    static async getTags(req, res) {
        try {
            let tags = null;
            const search = req.query.search;
            if (search) {
                tags = await Tag
                    .find({ name: new RegExp(search, "i") })
                    .lean();
            } else {
                tags = await Tag.find().lean();
            }
            res.status(200).send(tags);
        } catch (error) {
            res.status(500).send({ error: "Ocorreu um erro a tentar receber as perguntas" })
        }
    }
}

module.exports = TagsController;