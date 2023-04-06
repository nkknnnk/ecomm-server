const express = require('express')
const {createNewOrder,getusersOrderedProducts,CencelOrder} = require('../controllers/orderController')

const router = express.Router()

// A new Order Create
router.route("/createOrder").post(createNewOrder);
router.route("/:id").get(getusersOrderedProducts);
router.route("/:id").delete(CencelOrder);


module.exports = router