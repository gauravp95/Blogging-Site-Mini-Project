const express = require('express');
const router = express.Router();
const controller = require("../controller/controller")


router.post("/authors", controller.createAuthor)
router.post("/blogs", controller.createBlog)
router.get("/blogs", controller.getBlogs)
router.put("/blogs/:blogId", controller.updatedBlogs)
router.delete("/blogs/:blogId", controller.DeleteBlog)
router.delete("/blogs", controller.deleteBlogByQuery)



module.exports = router;