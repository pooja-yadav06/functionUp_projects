const mongoose = require("mongoose")

 
const collegeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },


    fullName: {
        type: String,
        required: true
    },
    // example `Indian Institute of Technology, Hyderabad`},


    logoLink: {
        required: true,
        type: String
    },

    isDeleted: {
        type: Boolean,
        default: false
    }


}, {timestamps:true})


module.exports = mongoose.model("College" , collegeSchema)