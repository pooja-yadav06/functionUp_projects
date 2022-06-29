const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
 
const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true
    },

    mobile: {
        type: Number,
        required: true,
        unique: true
    },

    collegeId: {
        type: ObjectId,
        ref: "College"
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Intern", internSchema)