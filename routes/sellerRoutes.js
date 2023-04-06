const express = require('express')
const {registerSeller, authController} = require('../controllers/sellerController')

const router = express.Router();

//user registration
router.route("/").post(registerSeller);
//login
router.route("/login").post(authController);

module.exports = router;