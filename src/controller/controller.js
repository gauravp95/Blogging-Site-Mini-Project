const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");
const mongoose = require("mongoose");
const moment = require("moment");
const createAuthor = async function (req, res) {
  try {
    let data = req.body;
    let author = await authorModel.create(data);
    res.status(201).send({ msg: author, status: true });
  } catch (error) {
    res.status(500).send({ msg: error.message, status: false });
  }
};

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    if (!mongoose.Types.ObjectId.isValid(data.authorId)) {
      return res.status(400).send({ status: false, msg: "Invalid Author-Id" });
    }
    let authorId = await authorModel.findById(data.authorId);
    if (!authorId) {
      res.status(400).send({ status: false, msg: "Invalid Author-Id" });
    }
    if (data.isPublished == true) {
      //Changes in date-time format
      data.publishedAt = moment().format('MMMM Do YYYY, hh:mm:ss ');
    }
    let blog = await blogModel.create(data);
    res.status(201).send({ status: true, data: blog });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


//=====>

const getBlogs = async function (req, res) {
  try {

    let queryData = req.query
    queryData.isDeleted = false;
    queryData.isPublished = true;

    if (!(queryData.authorId || queryData.category || queryData.tags || queryData.subcategory)) {
      return res.status(400).send({ status: false, msg: "Invalid Filters" })
    }
     if(!mongoose.Types.ObjectId.isValid(queryData.authorId)) {
         return res.status(400).send({status: false , msg:"Invalid Author-Id"})
      }

      let authorId = await authorModel.findById(queryData.authorId)

      if(!authorId) {
        return res.status(400).send({status: false , msg:" Author-Id Not Exist"})   
    }

     if(authorId){
    const blogData = await blogModel.find(queryData)


    if (blogData.length == 0) {
      return res.status(404).send({ status: false, msg: 'No Document Found' })
    }
    return res.status(200).send({ status: true, Data: blogData })
     }

  }
  catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }

}

//=====>
const updatedBlogs = async function (req, res) {
  try {
    let blog = req.body
    if (!(blog.title || blog.body || blog.tags || blog.subcategory || isPublished == true)) {
      return res.status(400).send({ status: false, msg: "Invalid Filters" })
    }
    let blogId = req.params.blogId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).send({ status: false, msg: "Invalid Blog-Id" })
    }
    let blogData = await blogModel.findById(blogId)
    if (blogData.isDeleted == true) {
      return res.status(404).send({ status: false, msg: "Data not found" })
    }

    blogData.publishedAt = moment().format('MMMM Do YYYY, h:mm:ss a');

    let updatedBlog = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { $addToSet: { tags: blog.tags, subcategory: blog.subcategory }, $set: { title: blog.title, body: blog.body } },
      { new: true }

    )
    res.status(200).send({ status: true, updatedData: updatedBlog })

  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.message});
  }
}

//======>

const DeleteBlog = async function (req, res) {
  try {
    let deleteId = req.params.blogId
    let validBlogId = await blogModel.findOne({ _id: deleteId });
    if (!validBlogId) {
      res.status(400).send({ status: false, msg: "Not a valid BlogId" })
    }
    let isDeletedStatus = await blogModel.findOne({ _id: deleteId, isDeleted: false });
    if (!isDeletedStatus) {
      res.status(400).send({ status: false, msg: "Blog is ALready deleted" })
    }
    let deletedDate = moment().format('MMMM Do YYYY, hh:mm:ss ');
    console.log(deletedDate)

    let data = await blogModel.findByIdAndUpdate({ _id: deleteId }, { isDeleted: true, deletedAt: deletedDate }, { new: true })

    res.status(200).send({ status: true, msg: data })
  } catch (err) {
    res.status(400).send({ status: false, msg: err.message })
  }
}

//=====>

const deleteBlogByQuery = async function (req, res) {
  try {
    let queryData = req.query
    if (!(queryData.category || queryData.authorId || queryData.tags || queryData.subcategory)) {
      res.status(404).send({ status: false, msg: "Invalid Request...." })
    }
    
    let deletedDate = moment().format('MMMM Do YYYY, hh:mm:ss ');
    let data1 = await blogModel.updateMany(queryData, { isDeleted: true, deletedAt: deletedDate }, { new: true })
   
    res.status(200).send({ status: true, msg: data1 })
  } catch (error) {
    res.status(400).send({ status: false, msg: error.message });
  }
}

module.exports={createAuthor,createBlog,getBlogs,updatedBlogs,DeleteBlog,deleteBlogByQuery}



















/*Blogs
{
  "author_id":"664bfea3456eau"
  "title": "How to win friends",
  "body": "Blog body",
  "tags": ["Book", "Friends"    , "Self help"],
  "category": "Book",
  "subcategory": ["Non fiction", "Self Help"],
  "published": false,
  "publishedAt": "", // if published is true publishedAt will have a date 2021-09-17T04:25:07.803Z
  "deleted": false,
  "deletedAt": "", // if deleted is true deletedAt will have a date 2021-09-17T04:25:07.803Z,
  "createdAt": "2021-09-17T04:25:07.803Z",
  "updatedAt": "2021-09-17T04:25:07.803Z",
} 
 
// - Blog Api
const createBlog = async function (req, res) {
    //taking request from user(JSON body)
    try{
    let request = req.body
    let checkAuthor_id = await AuthorModel.findById(request.author) //finds author _id in authormodel
    if(!request.author){
        res.send("Your request is wrong!!Send author id to check results...")
    }
    else if(!checkAuthor_id){
        res.send("No author present...")
    }
    else {
    let blogCreated = await blogModel.create(request)
    console.log("Blog Created")
    res.status(201).send({status:true, data: blogCreated})
    } catch(err){
        res.status(400).send({status:false , msg: err.message})
    }
}
}

*/
