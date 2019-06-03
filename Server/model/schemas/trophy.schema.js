const mongoose = require("mongoose");

// Schema variable
const Schema = mongoose.Schema;

// Trophies
const trophySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    trophyType: {
        type: String,
        required: true
    },
    goal: {
        type: Number
    }
});

const Trophy = mongoose.model('Trophy', trophySchema);

module.exports = Trophy;