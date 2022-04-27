const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");
const mongoose = require('mongoose')


const createBlog = async function (req, res) {
    try {
        let data = req.body
        if (!mongoose.Types.ObjectId.isValid(data.authorId)) {
            return res.status(400).send({ status: false, msg: "Invalid Author-Id" })
        }
        let authorId = await authorModel.findById(data.authorId)
        if (!authorId) {
            res.status(400).send({ status: false, msg: "Invalid Author-Id" })
        }
        if (data.isPublished == true) {
            data.publishedAt = new Date().toISOString()
        }
        let blog = await blogModel.create(data)
        res.status(201).send({ status: true, data: blog })


    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};

//=====>
const getBlogs =async function(req,res){
    try{
        let queryData = req.query
        if(!(queryData.authorId || queryData.category || queryData.tags || queryData.subcategory)){
            return res.status(400).send({status:false, msg :"Invalid Filters"})
        }
        if (!mongoose.Types.ObjectId.isValid(data.authorId)) {
            return res.status(400).send({ status: false, msg: "Invalid Author-Id" })
        }
        let authorId = await authorModel.findById(queryData.authorId)
        if(!authorId){
            return res.status(400).send({ status: false, msg: "Invalid Author-Id" })
        }
        if(authorId){
            const blogData =await blogModel.find({queryData, isDeleted:false, isPublished:true})
            if(blogData.length==0){
                return res.status(404).send({ status: false, msg: "No Document Found" })
            }
            return res.status(200).send({status:true, Data:blogData})
        }

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}
