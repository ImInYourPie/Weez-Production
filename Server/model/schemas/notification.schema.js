const mongoose = require("mongoose");

// Schema variable
const Schema = mongoose.Schema;

// Notifications
const notificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        default: "Olha ai uma notificação!"
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;