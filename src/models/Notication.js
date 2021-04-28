const mongoose = require("mongoose")
// const validator = require("validator")

const notificationSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true,
        trim : true
    },

    body : {
        type : String,
        required : true,
        trim : true
    },

    users : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }]
})

const Notification = mongoose.model("Notification", notificationSchema)

module.exports = Notification