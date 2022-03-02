require("dotenv").config();
//import
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//db connection
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
  console.log("mongoose failed with", err);
});
//import routes*
const productRoute = require("./routes/product.routes");
const categoryRouter = require("./routes/category.routes");
const authRouter = require("./auth/auth.routes");
const addressRouter = require("./routes/address.routes");
const orderRouter = require("./routes/order.routes");
const cartRouter = require("./routes/cart.routes");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes middleware
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRouter);
app.use("/auth", authRouter);
app.use("/api/addresses", addressRouter)
app.use("/api/orders",orderRouter)
app.use("/api/carts", cartRouter)

//server listing

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server in running on http://localhost:${port}`);
});
