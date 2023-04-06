const asyncHandler = require('express-async-handler')
const OrderModel = require('../models/orderModel')

const createNewOrder = asyncHandler(async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        totalPrice,
        userId,
      } = req.body;
  
      const Order = await OrderModel.create({
        firstName,
        lastName,
        email,
        phone,
        address,
        totalPrice,
        userId,
      });
      if (Order) {
        res.status(201).json({
            _id: Order._id,
            firstName: Order.firstName,
            lastName: Order.lastName,
            email: Order.email,
            phone: Order.phone,
            address: Order.address,
            totalPrice: Order.totalPrice,
            userId: Order.userId,
        });
        console.log("Order Successfully Placed");
      } else {
        res.status(404);
        throw new Error("Something went Wrong Please try again");
      }
    } catch (error) {}
  });

  const getusersOrderedProducts = asyncHandler(async (req, res) => {
    try {
      const product = await OrderModel.find({
        $or: [{ userId: { $regex: req.params.id } }],
      }).exec();
      res.send(product);
    } catch (error) {
      console.log(error);
    }
  });

  const CencelOrder = asyncHandler(async (req, res) => {
    try {
      const product = await OrderModel.findById(req.params.id).exec();
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

  module.exports = {createNewOrder, getusersOrderedProducts,CencelOrder}