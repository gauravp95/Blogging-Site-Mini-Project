const express = require('express');
const router = express.Router();
const blogcontroller = require("../controller/blogController")
const authorController=require("../controller/authorController")

router.post("/authors", authorController.createAuthor)
router.post("/login", authorController.loginAuthor)
router.post("/blogs", blogcontroller.createBlog)
router.get("/blogs", blogcontroller.getBlogs)
router.put("/blogs/:blogId", blogcontroller.updatedBlogs)
router.delete("/blogs/:blogId", blogcontroller.DeleteBlog)
router.delete("/blogs", blogcontroller.deleteBlogByQuery)



module.exports = router;