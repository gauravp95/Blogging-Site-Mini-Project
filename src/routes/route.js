const express = require('express');
const router = express.Router();
const controller = require("../controller/controller")


router.post("/authors", controller.createAuthor)
router.post("/blogs", controller.createBlog)



module.exports = router;