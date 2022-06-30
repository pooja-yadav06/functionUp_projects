const internModel = require("../models/internModel")
// const collegeController = require("./collegeController")
const ObjectId = require('mongoose').Types.ObjectId

const isValid = function (value) {
    if (!value || value === "undefined" || value === null) return false
    if (typeof value !== "string" || value.trim().length === 0) return false
    return true
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length == 0
}

const createIntern = async function (req, res) {
    try {
        let reqBody = req.body

        if (isValidRequestBody(reqBody)) return res.status(400).send({ status: false, message: "Please Provide Intern Data" })

        if (!isValid(reqBody.name)) return res.status(400).send({ status: false, message: "Please Enter Your Name" })

        if (!isValid(reqBody.email)) return res.status(400).send({ status: false, message: "Please Enter Your Email" })

        if (!reqBody.mobile) return res.status(400).send({ status: false, message: "Please Enter Your Number" })

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(reqBody.email))) {
            return res.status(400).send({ status: false, message: " Email should be in a Valid Format" })
        }

        if (!(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(reqBody.mobile))) {
            return res.status(400).send({ status: false, message: "Mobile number should be in Valid Format" })
        }

        let checkIfEmailIsPresent = await internModel.findOne({ email: reqBody.email })
        if (checkIfEmailIsPresent) return res.status(400).send({ status: false, message: `${checkIfEmailIsPresent.email} this email  already exists, please enter anothor email` })

        let checkIfNumberIsPresent = await internModel.findOne({ mobile: reqBody.mobile })
        if (checkIfNumberIsPresent) return res.status(400).send({ status: false, message: `${checkIfNumberIsPresent.mobile} this Number already exists, please enter anothor Number` })

        if (!ObjectId.isValid(reqBody.collegeId)) { // returns boolean. if not true than return invalid
            return res.status(400).send({ status: false, msg: "Bad Request. CollegeId invalid" })
        }

        let savedIntern = await internModel.create(reqBody)
        res.status(201).send({ status: true, data: savedIntern })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createIntern }