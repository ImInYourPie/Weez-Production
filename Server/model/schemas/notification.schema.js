const mongoose = require("mongoose");
const userSchema = require("./user.schema");

// Schema variable
const Schema = mongoose.Schema;

// Users
//Os users assumem 2 tipos: 0 - Moderator // 1 - Student
const notificationSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: "userSchema",
        required: true
    },
    description: {
        type: String,
        default: "Olha ai uma notificação!"
    },
    url: {
        type: String,
        required: true
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;