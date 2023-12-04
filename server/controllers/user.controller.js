const User = require("../models/user.model");
// const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
exports.registerController = async (req, res) => {
  const { threeLetterCode, userID, role } = req.body;
  console.log(req.body);
  const newUser = new User({
    threeLetterCode,
    userID,
    role,
  });

  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "User not created",
      data: newUser,
    });
  }
};

exports.getAllController = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    message: "Users fetched successfully",
    data: users,
  });
};
exports.getByIDController = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json({
    message: "User fetched successfully",
    data: user,
  });
};

exports.getByUsernameController = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ userID: username });
  res.status(200).json({
    message: "User fetched successfully",
    data: user,
  });
};

exports.updateController = async (req, res, next) => {
  const { userID, threeLetterCode, role } = req.body;
  let id = req.params.id;
  try {
    User.findOne({ _id: id }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "No User found found",
        });
      }
      if (!threeLetterCode) {
        user.threeLetterCode = user.threeLetterCode;
      } else {
        user.threeLetterCode = threeLetterCode;
      }
      if (!userID) {
        user.userID = user.userID;
      } else {
        user.userID = userID;
      }

      if (!role) {
        user.role = user.role;
      } else {
        user.role = role;
      }

      user.save((err, updatedUser) => {
        if (err) {
          console.log("User UPDATE ERROR", err);
          return res.status(400).json({
            error: "User update failed",
          });
        }
        res.json(updatedUser);
      });
    });
  } catch (err) {
    console.error("Update Controller not working");
    next(err);
  }
};
exports.deleteController = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    await user.remove();
    res.status(200).json({
      message: "User deleted successfully",
    });
  }
};
