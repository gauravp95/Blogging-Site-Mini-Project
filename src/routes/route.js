const express = require('express');
const router = express.Router();
const blogcontroller = require("../controller/blogController")
const authorController=require("../controller/authorController")
const auth = require("../middleware/middleware")

router.post("/authors", authorController.createAuthor)
router.post("/login", authorController.loginAuthor)
router.post("/blogs", blogcontroller.createBlog)
router.get("/blogs",auth.verifyJwt, blogcontroller.getBlogs)
router.put("/blogs/:blogId",auth.verifyJwt, blogcontroller.updatedBlogs)
router.delete("/blogs/:blogId",auth.verifyJwt, blogcontroller.DeleteBlog)
router.delete("/blogs",auth.verifyJwt, blogcontroller.deleteBlogByQuery)



module.exports = router;