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
            return res.status(400).send({status: false, msg: "Token is not valid"})
        }
        if (decodeToken) {
           let authorIdToken = decodeToken.authorId;
        //    if (authorId == authorIdToken) {
        //        next()
        //    } 
        }
    
        req.authorIdToken=decodeToken.authorId
        next()
    } catch (error) {
        return res.status(500).send({status:false, msg:error.message})
    }
}

const authorization = async function(req, res, next) {
        //Comapre the logged in user's id and the id in request
    try {
        //take token from login
        let token = req.headers["x-api-key"];
        //verify token - check if author is validate or not
        let decodedToken = jwt.verify(token, "uranium")
        //take blogId from params
        let userToBeModified = req.params.blogId
        //finds authorId of that blogId - { authorId: new ObjectId("626839e8f5ea47102cf73d7f") }
        let data = await blogModel.findById(userToBeModified).select({authorId:1,_id:0})
        //we have to take only authorId so convert it to string and here result as : 626839e8f5ea47102cf73d7f
        let authorId = data.authorId.toString();
        //check validation
        let userLoggedIn = decodedToken.authorId
        console.log(userLoggedIn)
        //check whether blogId has take authorId which is loggedIn 
        if (authorId != userLoggedIn) {
            //If not this shows error message 
          return res.status(403).send({ status: false, msg: 'Author logged is not allowed to modify the requested other authors data' })
        } else {
        
          next();
        }
      } catch (err) {
        res.status(500).send({ msg: err })
      }
}

module.exports = {authentication, authorization}
// module.exports.authorise=authorise;