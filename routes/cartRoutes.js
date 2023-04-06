const express = require('express')
const {addProductInCart, getusersCartProduct,deleteItemFromCart} = require('../controllers/cartController')

const router = express.Router();

//add-product in cart
router.route("/addToCart").post(addProductInCart);
router.route("/:id").get(getusersCartProduct);
router.route("/:id").delete(deleteItemFromCart);

module.exports = router;