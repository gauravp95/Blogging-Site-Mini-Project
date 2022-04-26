const express = require('express');
const router = express.Router();
const controller = require("../controller/controller")


router.post("/authors", controller.createAuthor)



module.exports = router;