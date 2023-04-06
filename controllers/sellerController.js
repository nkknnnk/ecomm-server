const Seller = require("../models/SellerModel");
const asyncHandler = require("express-async-handler");

const registerSeller = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const sellerExist = await Seller.findOne({ email });
  if (sellerExist) {
    res.status(400);
    throw new Error("Seller Already Exists!");
  }

  const seller = await Seller.create({ name, email, password });
  if (seller) {
    res.status(201).json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
    });
  } else {
    res.status(404);
    throw new Error("seller Not Found");
  }
});

const authController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });
    if (seller && (await seller.matchPassword(password))) {
      res.json({
        _id: seller._id,
        name: seller.name,
        email: seller.email,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

module.exports = {
  registerSeller,
  authController,
};
