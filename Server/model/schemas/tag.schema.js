const mongoose = require("mongoose");

// Schema variable
const Schema = mongoose.Schema;

// Tags
const tagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;