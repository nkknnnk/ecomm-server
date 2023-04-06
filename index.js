const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const fs = require('fs');
const index = fs.readFileSync('./index.html', 'utf-8');
const usersRoutes = require('./routes/userRoutes')
const sellersRoutes = require('./routes/sellerRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const cors = require('cors');



dotenv.config();
const server = express();
connectDb();

// middleware body parser
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send(index);
});
server.use("/api/users", usersRoutes);
server.use("/api/sellers", sellersRoutes);
server.use("/api/products", productRoutes);
server.use("/api/cart", cartRoutes);
server.use("/api/orders", orderRoutes);

server.listen(process.env.PORT, () => {
  console.log("server started");
});
