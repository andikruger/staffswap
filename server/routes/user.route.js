const express = require("express");
const router = express.Router();

const {
  // loginController,
  registerController,
  getAllController,
  getByIDController,
  getByUsernameController,
  updateController,
  deleteController,
} = require("../controllers/user.controller");

router.post("/register", registerController);
// router.post("/login", loginController);
router.get("/", getAllController);
router.get("/id/:id", getByIDController);
router.get("/username/:username", getByUsernameController);
router.put("/update/:id", updateController);
router.delete("/delete/:id", deleteController);

module.exports = router;
