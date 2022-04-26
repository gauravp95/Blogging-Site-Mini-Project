const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");

const createAuthor = async function (req, res) {
  try {
    let data = req.body;
    let author = await authorModel.create(data);
    res.status(200).send({ msg: author, status: true });
  } catch (error) {
    res.status(500).send({ msg: error.message, status: false });
  }
};

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    let author = req.authorId;
    let validAuthor = await authorModel.find({_id:author});
    if (!validAuthor) {
        res.status(400).send({status: false, msg: "Not a valid authorId"})
    }
    let blog = await blogModel.create(data);
    res.status(201).send({status: true, data: blog });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message});
  }
};

module.exports.createAuthor = createAuthor;
module.exports.createBlog = createBlog;















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
