const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.post("/login", authController.loginAccount);

router.post("/register", authController.registerAccount);

module.exports = router;
