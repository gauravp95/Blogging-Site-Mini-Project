const authorModel = require("../models/authorModel");

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let author = await authorModel.create(data);
        return res.status(201).send({ msg: author, status: true });
    } catch (error) {
        return res.status(500).send({ msg: error.message, status: false });
    }
};


module.exports = { createAuthor };