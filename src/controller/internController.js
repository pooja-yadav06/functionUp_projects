const internModel = require("../models/internModel")



const createIntern = async function (req,res){
    try{
    let reqBody = req.body
    let savedIntern = await (await internModel.create(reqBody)).populate("collegeId")
    res.status(201).send({status:true, data : savedIntern})
    }
    catch(error){
        res.status(500).send({status:false , message : error.message})
    }
}


module.exports = {createIntern}
