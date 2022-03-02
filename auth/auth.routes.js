const User = require("../models/user.models");
const Address = require("../models/address.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Cart = require("../models/cart.models");

const router = require("express").Router();
router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(422).json("Email already exist");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
  try {
    const newAddress = new Address({
      street: req.body.street,
      city: req.body.city,
      country: req.body.country,
      zipCode: req.body.zipCode
    });
    const savedAddress = await newAddress.save();
   // console.log(savedAddress)

    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //! creation cart 
    const newCart = new Cart();
    const savedCard= await newCart.save();
    //!------
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      address: savedAddress._id,
      cart:savedCard._id
    });

    const savedUser = await newUser.save();
    return res.status(202).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }); //jib l user 7asem email(email 5ater tlabto fel postman))client

    if (!user) {
      return res.status(401).json("wrong email or password ");
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    ); //dicripte ll pass wo y9arno m3a lelli da5lo luser
    if (!isPasswordValid) {
      return res.status(401).json("wrong password or email");
    }
    /*  const payload = {
      _id: user._id,
      email: user.email,
      //  firstName:user.firstName
    }; 
     const privatekey = process.env.TOKEN_KEY; 

    const option = { expiresIn: "3 days" };
 */
    const token = jwt.sign(
      /* payload */ {
        _id: user._id,
        email: user.email,
        name: user.firstName,
        cart:user.cart,
        address:user.address
        /*firstName:user.firstName}*/,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "3 days" }
    );
    //console.log(user._id)

    return res.status(200).json({ user: user, token: token });
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/user", async (req, res) => {
  try {
    const user = await User.find().populate("address");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json(err);
  }
});

module.exports = router;
