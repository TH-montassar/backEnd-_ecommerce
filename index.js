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
//import routes

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes middleware

//server listing

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`server in running on http://localhost:${port}`)
})
