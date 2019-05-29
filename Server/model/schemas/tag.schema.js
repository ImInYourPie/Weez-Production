const mongoose = require("mongoose");

// Schema variable
const Schema = mongoose.Schema;

// Users
const tagSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
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