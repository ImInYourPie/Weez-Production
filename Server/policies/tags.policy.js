const Joi = require("joi");
const Tag = require("../model/schemas/tag.schema");

module.exports = {

    async addTag(req, res, next) {

        let { tag } = req.body;

        const schema = {
            tag: Joi.string(),
        };

        const { error, value } = Joi.validate(tag, schema);

        let tagExists = await Tag.findOne({ name: tag }).lean();

        if (error) {
            return res.status(400).send({ tagError: "Tag inválida" });
        }
        else {
            if (tagExists) next()
            else {
                let newTag = new Tag({
                    name: tag
                })
                newTag.save((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        next();
                    }
                })
            }
        }
    }
}