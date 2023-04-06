const asyncHandler = require("express-async-handler");
const CartModel = require("../models/cartModel");

const addProductInCart = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      image,
      color,
      price,
      category,
      description,
      quantity,
      userId,
      productId,
    } = req.body;

    const Product = await CartModel.create({
      name,
      image,
      color,
      price,
      category,
      description,
      quantity,
      userId,
      productId,
    });
    if (Product) {
      res.status(201).json({
        _id: Product._id,
        name: Product.name,
        category: Product.category,
        price: Product.price,
        color: Product.color,
        image: Product.image,
        description: Product.description,
        quantity: Product.quantity,
        userId: Product.userId,
        productId: Product.productId,
      });
      console.log("Product is successfully added in cart");
    } else {
      res.status(404);
      throw new Error("Product is Not added in cart Please try again");
    }
  } catch (error) {}
});

const getusersCartProduct = asyncHandler(async (req, res) => {
  try {
    const product = await CartModel.find({
      $or: [{ userId: { $regex: req.params.id } }],
    }).exec();
    res.send(product);
  } catch (error) {
    console.log(error);
  }
});

const deleteItemFromCart = asyncHandler(async (req, res) => {
  try {
    const product = await CartModel.findById(req.params.id).exec();
    if (!product) {
      res.send({ error: true, massage: "Server Error" });
    } else {
      const result = await product.deleteOne();
      const reply = `Product ${result.name} with ID ${result._id} deleted`;
      res.json(reply);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  addProductInCart,
  getusersCartProduct,
  deleteItemFromCart,
};
