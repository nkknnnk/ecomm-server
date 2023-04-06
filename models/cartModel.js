const mongoose = require('mongoose')

const cartSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      quantity: {
        type:Number,
        required: true,
        default:0
      },
      userId: {
        type: String,
        required: true,
      },
      productId: {
        type: String,
        required: true,
      }
    },
    { timestamps: true }
  );
  
  const Cart = mongoose.model("Cart", cartSchema);
  module.exports = Cart;