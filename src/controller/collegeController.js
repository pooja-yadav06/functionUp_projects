const collegeModel = require("../models/collegeModel")



const createCollege = async function(req,res){

    try{
    let reqBody = req.body
    let savedData = await collegeModel.create(reqBody)
    res.status(201).send({status:true , message : savedData})
    }
    catch(err){
        res.status(500).send({status:false , message : err.message})
    }

}


module.exports= {createCollege}