const Joi = require("joi");
const Tag = require("../model/schemas/tag.schema");

module.exports = {

    async addTag(req, res, next) {

        let { tags } = req.body;
        
        // console.log(tags)
        // const schema = Joi.array().items(Joi.string());
    
        // const { error, value } = Joi.validate(tags, schema);
        
        let error = false

        if (error) {
            return res.status(400).send({ tagError: "Tag inválida" });
        }
        else {
            for (let i = 0; i < tags.length; i++) {
                let tagExists = await Tag.findOne({ name: tags[i] });
                if (!tagExists) {
                    let newTag = await new Tag({
                        name: tags[i]
                    })
                    newTag.save((err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }

            }
            next()
        }
    }

}