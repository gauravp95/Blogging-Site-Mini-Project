const express = require('express');
const router = express.Router();
const blogcontroller = require("../controller/blogController")
const authorController=require("../controller/authorController")
const {verifyJwt, authorise}  = require("../middleware/middleware")

router.post("/authors", authorController.createAuthor)
router.post("/login", authorController.loginAuthor)
router.post("/blogs", blogcontroller.createBlog)
router.get("/blogs",verifyJwt, blogcontroller.getBlogs)
router.put("/blogs/:blogId",auth.verifyJwt, auth.authorise ,blogcontroller.updatedBlogs)
router.delete("/blogs/:blogId",auth.verifyJwt, auth.authorise ,blogcontroller.DeleteBlog)
router.delete("/blogs",auth.verifyJwt, blogcontroller.deleteBlogByQuery)



module.exports = router;