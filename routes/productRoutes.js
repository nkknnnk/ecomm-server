const express = require('express')
const {addProduct, getProduct, deleteProduct, updateProduct,getoneProduct,searchProduct} = require('../controllers/productControllers')

const router = express.Router();

//add-product
router.route("/add").post(addProduct);
//login
router.route("/").get(getProduct);
//login
router.route("/delete/:id").delete(deleteProduct);
//get
router.route("/getone/:id").get(getoneProduct);
//Update
router.route("/update/:id").put(updateProduct);
//search product
router.route("/search/:key").get(searchProduct);


module.exports = router;