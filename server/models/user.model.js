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
      enum: [
        "Junior Agent",
        "Supervisor",
        "Duty Manager",
        "Ticketing Agent",
        "Lounge Agent",
        "Ramp Agent",
        "Staff Dispatcher",
        "Trainer",
      ],
      default: "Junior Agent",
    },
  },
  {
    timestamps: true,
  }
);

// Hash the value of userID before saving the user model

UserSchema.pre("save", async function (next) {
  if (!this.isModified("userID")) {
    let userIdHash = crypto.Hash("sha256").update(this.userID).digest("hex");
    this.userID = userIdHash;

    // hash the value of userID if it is modified and
    next();
  }

  next();
});

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("userID")) {
//     // hash the value of userID if it is modified and
//     next();
//   }

//   next();
// });

// UserSchema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// UserSchema.methods.getSignedJwtToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       name: this.name,
//       email: this.email,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_EXPIRE,
//     }
//   );
// };

// UserSchema.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // this.resetPasswordToken = crypto
//   //   .createHash("sha512")
//   //   .update(resetToken)
//   //   .digest("hex");

//   this.resetPasswordToken = resetToken;
//   let dateToExpire = Date.now() + 500 * (60 * 1000);
//   let datenow = Date.now();
//   this.resetPasswordExpire = dateToExpire;
//   console.log("time to expire is " + dateToExpire);
//   console.log("time now " + datenow);

//   return resetToken;
// };

const User = mongoose.model("User", UserSchema);

module.exports = User;
