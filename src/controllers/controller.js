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


