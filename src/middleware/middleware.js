const jwt = require("jsonwebtoken");

const verifyJwt = async function (req,res,next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({status: false, msg: "Token not Found"});
        }
        let decodeToken = await jwt.verify(token,"uranium");
        if (!decodeToken) {
            return res.status(400).send({status: false, msg: "Token is not valid"})
        }
        // if (decodeToken) {
        //    let authorIdToken = decodeToken.authorId;
        //    if (authorId == authorIdToken) {
        //        next()
        //    } 
        // }
        next()
    } catch (error) {
        return res.status(500).send({status:false, msg:error.message})
    }
}

const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    try {
        let token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "uranium")
        let userToBeModified = req.params.authorId
        let userLoggedIn = decodedToken.authorId
        if (userToBeModified != userLoggedIn) {
          return res.send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
        } else {
          next();
        }
      } catch (err) {
        res.status(500).send({ msg: err })
      }
}

module.exports.verifyJwt = verifyJwt;
module.exports.authorise=authorise;