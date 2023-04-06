const ProductModel = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const addProduct = asyncHandler(async (req, res) => {
  const { name, image, color, price, category, description } = req.body;
  // const ProductExist = await Product.findOne({ email });
  // if (ProductExist) {
  //   res.status(400);
  //   throw new Error("Product Already Exists!");
  // }

  const Product = await ProductModel.create({
    name,
    image,
    color,
    price,
    category,
    description,
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
    });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});
const getProduct = asyncHandler(async (req, res) => {
  try {
    let data = await ProductModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
const getoneProduct = asyncHandler(async (req, res) => {
  try {
    let productid = req.originalUrl.split("/getone/")[1];
    const product = await Product.findById(productid).exec();
    res.send(product);
  } catch (error) {
    console.log(error);
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  try {
    let productid = req.originalUrl.split("/update/")[1];
    const product = await Product.findById(productid).exec();
    product.name = req.body.name;
    product.price = req.body.price;
    product.color = req.body.color;
    product.category = req.body.category;
    product.image = req.body.image;
    product.description = req.body.description;
    console.log(product);
    const updateProduct = await product.save();
  } catch (error) {
    console.log(error);
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    let productid = req.originalUrl.split("/delete/")[1];
    const product = await Product.findById(productid).exec();
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
const searchProduct = asyncHandler(async (req, res) => {
  try {
    let data = await Product.find({
      $or: [{ 'name': { $regex: req.params.key.toUpperCase() } }],
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});


module.exports = {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getoneProduct,
  searchProduct
};
