const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },

    email : {
        type : String,
        trim : true,
        unique : true,
        required : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Enter valid email :)")
            }
        }
    },

    notifications : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Notification'
    }]
})

const User = mongoose.model("User" , userSchema)

module.exports = User