const mongoose = require("mongoose");
const userSchema = require("./user.schema");

// Schema variable
const Schema = mongoose.Schema;

// Notifications
const notificationSchema = new Schema({
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