const express = require('express');
const router = express.Router();
const {createBlog,getBlogs,updatedBlogs,deleteBlog,deleteBlogByQuery} = require("../controller/blogController")
const{createAuthor} =require("../controller/authorController")

router.post("/authors", createAuthor)
router.post("/blogs", createBlog)
router.get("/blogs", getBlogs)
router.put("/blogs/:blogId", updatedBlogs)
router.delete("/blogs/:blogId", deleteBlog)
router.delete("/blogs", deleteBlogByQuery)



module.exports = router;