const collegeModel = require("../models/collegeModel")



const createCollege = async function(req,res){

    try{
    let reqBody = req.body
    let savedData = await collegeModel.create(reqBody)
    res.status(201).send({status:true , data : savedData})
    }
    catch(error){
        res.status(500).send({status:false , message : error.message})
    }

}


const collegeDetails = async function (req,res){
    try{
        let name = req.query.name
        let collegeData = await collegeModel.find({name})
        res.status(200).send({status:true , data:collegeData})
        console.log(collegeData)
    }
    catch(error){
        res.status(500).send({status:false , message : error.message})
    }
} 


module.exports= {createCollege , collegeDetails}