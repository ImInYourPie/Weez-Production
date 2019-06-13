const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
// const trophySchema = require("./trophy.schema.js");

// Schema variable
const Schema = mongoose.Schema;

// Users

const userSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/iminyourcloud/image/upload/v1559269810/DefaultPic_odfcze.jpg"
    },
    upVotes: {
        type: Number,
        default: 0
    },
    downVotes: {
        type: Number,
        default: 0
    },
    experience: {
        type: Number,
        default: 0
    },
    reputation: {
        type: Number,
        default: 0
    },
    userType: {
        type: String,
        default: "student",
        required: true
    },
    trophies: [{
        type: Schema.Types.ObjectId,
        ref: 'Trophy'
    }],
    registerDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    bio: {
        type: String,
        default: "Este utilizador não escreveu a sua bio, mas mesmo assim acreditamos que seja uma pessoa bacana! De qualquer das maneiras pode ser que um dia escreva. Se fores tu o utilizador, de que estás à espera?"
    },
    watchedTags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }],
    watchedQuestions: [{
        type: Schema.Types.ObjectId,
        ref: "Question"
    }],
    recentlyViewed: [{
        type: Schema.Types.ObjectId,
        ref: "RecentlyViewed"
    }]

});

userSchema.plugin(mongooseUniqueValidator);

// Create model
const User = mongoose.model('User', userSchema);

// Export model
module.exports = User;

// const mongoose = require("mongoose");
// const mongooseUniqueValidator = require("mongoose-unique-validator");
// // const trophySchema = require("./trophy.schema.js");

// // Schema variable
// const Schema = mongoose.Schema;

// // Users

// const userSchema = new Schema({
//     // _id: mongoose.Schema.Types.ObjectId,
//     username: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     profilePic: {
//         type: String,
//         default: "https://res.cloudinary.com/iminyourcloud/image/upload/v1559269810/DefaultPic_odfcze.jpg"
//     },
//     upVotes: {
//         type: Number,
//         default: 0
//     },
//     downVotes: {
//         type: Number,
//         default: 0
//     },
//     experience: {
//         type: Number,
//         default: 0
//     },
//     userType: {
//         type: String,
//         default: "student",
//         required: true
//     }
//     // trophies: [trophySchema]
// });

// userSchema.plugin(mongooseUniqueValidator);

// // Create model
// const User = mongoose.model('User', userSchema);

// // Export model
// module.exports = User;