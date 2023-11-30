const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    threeLetterCode: {
      type: String,
      required: [true, "Please provide a three letter code"],
      unique: true,
      match: [/^[A-Z]{3}$/, "A three letter code is required"],
    },
    userID: {
      type: String,
      required: [true, "Please provide a user ID"],
      unique: true,
      //match: [/^[A-Z]{3}[0-9]{3}$/, "A user ID is required"],
    },
    role: {
      type: String,

      default: "Junior Agent",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
