const mongoose = require("mongoose");
const validator = require("validator");

const authorModel = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: 'First name is required',
      trim: true
    },
    lname: {
      type: String,
      required: 'Last name is required',
      trim: true
    },
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Miss", "Mast"],
      required: "Title is required"
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: "Email address is required",
      validate: {
        validator: function (email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        }, message: 'Please fill a valid email address', isAsync: false
      }
    },
    password: {
      type: String,
      required: 'Password is required',
      trim: true
    },
  },{ timestamps: true }
);

module.exports = mongoose.model("author", authorModel);
