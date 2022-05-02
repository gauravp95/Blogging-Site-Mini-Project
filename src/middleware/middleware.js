const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");
const authorModel = require("../models/blogModel")



const authentication = async function (req,res,next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({status: false, msg: "Token not Found"});
        }
        let decodeToken = await jwt.verify(token,"uranium");
        if (!decodeToken) {
            return res.status(401).send({status: false, msg: "Token is not valid"})
        }
        if (decodeToken) {
           var authorIdToken = decodeToken.authorId;
        
        }
    
        req.authorIdToken=authorIdToken
        next()
    } catch (error) {
        return res.status(500).send({status:false, msg:error.message})
    }
}

const authorization = async function(req, res, next) {
        //Comapre the logged in author's id and the id in jwt
    try {
        //take token from header
        let token = req.headers["x-api-key"];
        if (!token) {
          return res.status(400).send({status: false, msg: "Token not Found"});
      }
        //verify token - check if author is validate or not
        let decodedToken = jwt.verify(token, "uranium");
        if (!decodedToken) {
          return res.status(400).send({status: false, msg: "Token is not valid"})
      }
        //take blogId from params
        let blogId = req.params.blogId
        if(!blogId){
          return res.status(400).send({status: false, msg: "Please entered Blog-Id"})
        }
        //finds authorId of that blogId - { authorId: new ObjectId("626839e8f5ea47102cf73d7f") }
        console.log(blogId)
        let blogIdDB = await blogModel.findById(blogId)
        console.log(blogIdDB)
        if(!blogIdDB){
          return res.status(404).send({status: false, msg: "Blog-Id is not found"})
        }
        //we have to take only authorId so convert it to string and here result as : 626839e8f5ea47102cf73d7f
        let authorId = blogIdDB.authorId.toString();
        //check validation
        let tokenAuthorId = decodedToken.authorId
        //check whether blogId has take authorId which is loggedIn 
        if (authorId != tokenAuthorId) {
            //If not this shows error message 
          return res.status(403).send({ status: false, msg: 'Author logged token is not matched' })
        } else {
        
          next();
        }
      } catch (err) {
        res.status(500).send({ msg: err })
      }
}

module.exports = {authentication, authorization}
