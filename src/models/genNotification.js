const mongoose = require("mongoose")

const genNotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  body: {
    type: String,
    trim: true,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
})

genNotification = mongoose.model("general_notifications", genNotificationSchema)

module.exports = genNotification
