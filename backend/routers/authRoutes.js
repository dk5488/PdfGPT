const express = require("express");
const { signupController, loginController } = require("../controllers/authController");

const router = express.Router();

// Signup route
router.post("/signup", signupController);

// Login route
router.post("/login", loginController);

module.exports = router;
