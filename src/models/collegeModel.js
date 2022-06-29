const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    fullName: {
        type: String,
        required: true,
        trim:true
    },

    logoLink: {
        required: true,
        type: String
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("College" , collegeSchema)