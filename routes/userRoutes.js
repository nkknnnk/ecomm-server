const express = require('express')
const {registerUser, authController} = require('../controllers/userController')

const router = express.Router();

//user registration
router.route("/").post(registerUser);
//login
router.route("/login").post(authController);

module.exports = router;