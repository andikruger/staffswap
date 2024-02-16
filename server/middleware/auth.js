/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user.model.js");

dotenv.config();
const { SECRET_KEY } = process.env;

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = await User.findById(decoded.id);
  } catch (error) {
    return res.status(401).json({ message: "Account not found" });
  }

  next();
};
