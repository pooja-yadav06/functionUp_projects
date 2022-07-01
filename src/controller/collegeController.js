const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

const isValid = function (value) {
    if ( value === "undefined" || value === null) return false
    if (typeof value !== "string" || value.trim().length === 0) return false
    return true
}

const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length == 0
}

const createCollege = async function(req,res){
    try{
        let reqBody = req.body

        if(isValidRequestBody(reqBody)) return res.status(400).send({status: false, message: "Please Provide College Data"})
    
        if(!isValid(reqBody.name)) return res.status(400).send({status: false, message: "Please Enter College Name"})
    
        if(!isValid(reqBody.fullName)) return res.status(400).send({status: false, message: "Please Enter College Full Name"})

        if(!isValid(reqBody.logoLink)) return res.status(400).send({status: false, message: "Please Enter College Logo Link"})

        let checkIfCollegeIsPresent = await collegeModel.findOne({name: reqBody.name})
        
        if(checkIfCollegeIsPresent)return res.status(400).send({status: false, message: `${checkIfCollegeIsPresent.name} this college name already exists, please enter anothor name`})
    
        let savedData = await collegeModel.create(reqBody)
        res.status(201).send({status:true, data : savedData})
    } catch(error){
        res.status(500).send({status:false, message: error.message})
    }
}

const collegeDetails = async function (req,res){
    try{
        let nameOfCollege = req.query.collegeName

        if(nameOfCollege){
            let collegeData = await collegeModel.findOne({name: nameOfCollege})

            if(!collegeData) return res.status(404).send({status:false , message: `${nameOfCollege} College Name not found. Please enter a valid college name` })  

            let resultObject= {
                name: collegeData.name,
                fullName: collegeData.fullName,
                logoLink: collegeData.logoLink
            }
            // let id = collegeData._id
            let internsDetails = await internModel.find({collegeId: collegeData._id}).select({name:1, email:1, mobile:1})
            
            if(internsDetails.length === 0){
                return res.status(400).send({status: false, message: "This College has no interns"})
            }
            resultObject.interns= internsDetails
           
            res.status(200).send({ status: true, data: resultObject})
           
        }else{
            res.status(400).send({ status: false, message: "Please Provide College Name to Get Details..."}) 
        }
    } catch(error){
        res.status(500).send({ status: false, message: error.message})
    }
} 

module.exports= {createCollege , collegeDetails}