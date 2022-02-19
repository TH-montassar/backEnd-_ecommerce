const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      // address: savedAddress._id,
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

    const isPasswordValid = await bcrypt.compare(req.body.password,user.password ); //dicripte ll pass wo y9arno m3a lelli da5lo luser
    if (!isPasswordValid) {
      return res.status(401).json("wrong password or email");
    }

    const token = jwt.sign({ id: user._id, email: user.email },process.env.TOKEN_KEY, {
      expiresIn: "2 days",
    });
    console.log(user._id)
    
    return res.status(200).json({ user: user, token: token });
  } catch (err) {}
});
module.exports = router;
