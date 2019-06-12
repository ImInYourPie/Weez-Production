let Tag = require('../model/schemas/tag.schema.js');

class TagsController {

    static async getTags(req, res) {
        // Get data
        // Tag.find().select("-_id -__v -description").lean().exec((err, tags) => {
        //     res.status(200).send(tags);
        // })
        const tags = await Tag.find({}).select("+name -_id -description -__v").lean()
        console.log(tags)
        res.status(200).send(tags)
    }
}

module.exports = TagsController;