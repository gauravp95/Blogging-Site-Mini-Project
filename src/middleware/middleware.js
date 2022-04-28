const jwt = require("jsonwebtoken");

const verifyJwt = async function (req,res,next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({status: false, msg: "Token not Found"});
        }
        let decodeToken = await verifyJwt.verify(token, "uranium");
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

module.exports.verifyJwt = verifyJwt;