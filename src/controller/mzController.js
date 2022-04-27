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
const getBlogs = async function (req, res) {
    try {
        let queryData = req.query
        if (!(queryData.authorId || queryData.category || queryData.tags || queryData.subcategory)) {
            return res.status(400).send({ status: false, msg: "Invalid Filters" })
        }
        if (!mongoose.Types.ObjectId.isValid(data.authorId)) {
            return res.status(400).send({ status: false, msg: "Invalid Author-Id" })
        }
        let authorId = await authorModel.findById(queryData.authorId)
        if (!authorId) {
            return res.status(400).send({ status: false, msg: "Invalid Author-Id" })
        }
        if (authorId) {
            const blogData = await blogModel.find({...queryData, isDeleted: false, isPublished: true })
            if (blogData.length == 0) {
                return res.status(404).send({ status: false, msg: "No Document Found" })
            }
            return res.status(200).send({ status: true, Data: blogData })
        }

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}


const updatedBlogs = async function (req, res) {
    try {
        let blog = req.body
        if(!(blog.title || blog.body || blog.tags || blog.subcategory || isPublished==true)){
            return res.status(400).send({status:false, msg:"Invalid Filters"})
        }
        let blogId = req.params.blogId
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).send({ status: false, msg: "Invalid Blog-Id" })
        }
        let blogData = await blogModel.findById(blogId)
        if(blogData.isDeleted==true){
            return res.status(404).send({status:false, msg:"Data not found"})
        }
        
            blogData.publishedAt=new Date().toISOString
        
        let updatedBlog = await blogModel.findByIdAndUpdate(
            {_id:blogId},
            {$addToSet:{tags:blog.tags, subcategory:blog.subcategory},$set:{title:blog.title, body:blog.body}},
            {new:true}

        )
        res.status(500).send({status:true, updatedData:updatedBlog})

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}