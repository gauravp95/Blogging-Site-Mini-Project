const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");
const mongoose = require("mongoose")
const moment =require("moment")




const createBlog = async function (req, res) {
  try {
    let data = req.body;
    if (!mongoose.Types.ObjectId.isValid(data.authorId)) {
      return res.status(400).send({ status: false, msg: "Invalid Author-Id" });
    }
    let authorId = await authorModel.findById(data.authorId);
    if (!authorId) {
      return res.status(404).send({ status: false, msg: "Invalid Author-Id" });
    }
    if (data.isPublished == true) {
      data.publishedAt = moment().format("DD-MM-YYYY, hh:mm a")

    }
    let blog = await blogModel.create(data);
    return res.status(201).send({ status: true, data: blog });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
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
     
     let obj = {}                            //creating obj to filterout only authorized key
     
     if (queryData.authorId != undefined) {
       obj.authorId = queryData.authorId
     }                                       
     if (queryData.category != undefined) {
       obj.category = queryData.category
     }
     if (queryData.tags != undefined) {
       obj.tags = queryData.tags
     }
     if (queryData.subcategory != undefined) {
       obj.subcategory = queryData.subcategory
     }
     //adding key as per the requirement of problem that isDeleted =false & isPublished =true
     queryData.isDeleted = false;
    queryData.isPublished = true;
    
    const blogData = await blogModel.find(obj)
    if (blogData.length == 0) {
      return res.status(404).send({ status: false, msg: 'No Document Found' })
    }
    return res.status(200).send({ status: true, Data: blogData })
    

  }
  catch (err) {
    return res.status(500).send({ status: false, error: err.message })
  }

}

//=====>
const updatedBlogs = async function (req, res) {
  try {
    let blog = req.body
    if (!(blog.title || blog.body || blog.tags || blog.subcategory || blog.isPublished)) {
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
    console.log(blog.subcategory)
    blogData.publishedAt =   moment().format("DD-MM-YYYY, hh:mm a")

    let updatedBlog = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { $addToSet: { tags: blog.tags, subcategory: blog.subcategory }, $set: { title: blog.title, body: blog.body } },
      { new: true }

    )
    return res.status(200).send({ status: true, updatedData: updatedBlog })

  }
  catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
}

//======>

const deleteBlog = async function (req, res) {
  try {
    let blogIdToBeDeleted = req.params.blogId
    if(!blogIdToBeDeleted){
      return res.status(400).send({ status: false, msg: "Blog Id is not entered" })
    }
    let validBlogId = await blogModel.findOne({ _id: blogIdToBeDeleted });
    if (!validBlogId) {
      return res.status(400).send({ status: false, msg: "Blog Id is invalid" })
    }
    let isDeletedStatus = await blogModel.findOne({ _id: blogIdToBeDeleted, isDeleted: false });
    if (!isDeletedStatus) {
      return res.status(404).send({ status: false, msg: "Blog is ALready deleted" })
    }
    let deletedDate = moment().format("DD-MM-YYYY, hh:mm a")
    

    let data = await blogModel.findByIdAndUpdate({ _id: blogIdToBeDeleted }, { isDeleted: true, deletedAt: deletedDate }, { new: true })

    return res.status(200).send({ status: true, msg: data })
  } catch (error) {
    return res.status(400).send({ status: false, msg: error.message })
  }
}

//=====>

const deleteBlogByQuery = async function (req, res) {
  try {
    let queryData = req.query
    let tokenAuthorId = req.authorIdToken
    let queryAuthorId = queryData.authorId
    //To check that we get atleast 1 authorized key in query param
    if (!(queryData.category || queryData.authorId || queryData.tags || queryData.subcategory)) {
      return res.status(400).send({ status: false, msg: "Invalid Request...." })
    }
    if(queryAuthorId){
      if(tokenAuthorId != queryAuthorId){
        return res.status(400).send({ status: false, msg: "Token is not match with authorId" })
      }
    }
    let obj = {}                              //creating obj to filterout only authorized key
      
      obj.authorId = tokenAuthorId
     //checking that key has some value or not
    if (queryData.category != undefined) {
      obj.category = queryData.category
    }
    if (queryData.tags != undefined) {
      obj.tags = queryData.tags
    }
    if (queryData.subcategory != undefined) {
      obj.subcategory = queryData.subcategory
    }
    // console.log(obj)
    let deletedDate =  moment().format("DD-MM-YYYY, hh:mm a")
    let updateDeleteStatus = await blogModel.updateMany(obj, { isDeleted:true, deletedAt: deletedDate } , { new: true })
    //  console.log(updateDeleteStatus)
    
    if(updateDeleteStatus.matchedCount==0){
      return res.status(404).send({ status: false, msg: "No Match Found" })
    }                                                                             //It will check that we got some match or not
    return res.status(200).send({ status: true, data:updateDeleteStatus });

  } catch (error) {
    return res.status(400).send({ status: false, msg: error.message });
  }
}

//===>

module.exports = {createBlog,getBlogs,updatedBlogs,deleteBlog,deleteBlogByQuery};


// module.exports.getBlogs = getBlogs;
// module.exports.updatedBlogs = updatedBlogs;
// module.exports.DeleteBlog = DeleteBlog;
// module.exports.deleteBlogByQuery = deleteBlogByQuery


