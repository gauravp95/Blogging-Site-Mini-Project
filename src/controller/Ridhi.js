const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");
const mongoose = require('mongoose')

const Delete = async function(req,res){
    try{
    let deleteId = req.params.blogId
    let validBlogId = await blogModel.find({_id:deleteId});
    if (!validBlogId) {
        res.status(400).send({status: false, msg: "Not a valid BlogId"})
    }
    
    let data = await blogModel.findByIdAndUpdate({_id:deleteId},{isDeleted:true,deletedAt:Date.toISOString()},{new:true})
    
    res.status(200).send({status:true,msg:data})
    } catch(error){
    res.status(400).send({status:false,msg:error.message})
}
}


const deleteByBlog = function(req,res){
    try{
        let queryData = req.params
        if(!(queryData.category || queryData.authorId || querData.tags || queryData.subcategory)){
            res.status(404).send({status:false,msg:"Invalid Request...."})
        }
        let data = await blogModel.find({queryData}).update({isDeleted:true,deletedAt:Date.toISOString()},{new:true})
    
    res.status(200).send({status:true,msg:data})
    } catch(error){
        res.status(400).send({status:false,msg:error.message});
    }
}