let Tag = require('../model/schemas/tag.schema.js');

class TagsController {

    static async getTags() {
        // Get data
        Tag.find().exec((err, tags) => {
            res.status(200).send(tags);
        })
    }
}

module.exports = TagsController;