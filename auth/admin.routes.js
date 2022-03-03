const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const IsAdmin = require("../middlewares/IsAdmin");
const verifyToken = require("../middlewares/verifyToken");
const Admin = require("../models/admin.models");
const router = require("express").Router();

router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(401).json("wrong email or password ");
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!isPasswordValid) {
      return res.status(401).json("wrong password or email");
    }

    const token = jwt.sign(
      {
        _id: admin._id,
        email: admin.email,
        name: admin.firstName,

        firstName: admin.firstName,
        isAdmin: admin.isAdmin,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "3 days" }
    );

    return res.status(200).json({ admin: admin, token: token });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/addAdmin", verifyToken, IsAdmin, async (req, res) => {
    
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      return res.status(422).json("Email already exist");
    }
  } catch (err) {
    return res.status(500).json(err);
  }

  try {
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newAdmin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      addedBy : req.verifiedUser._id
    });

    const savedAdmin = await newAdmin.save();

    return res.status(202).json(savedAdmin);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.delete("/:adminId", verifyToken, IsAdmin, async (req, res) => {
  const adminId = req.params.adminId;
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    return res.status(200).json(deletedAdmin);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/update", verifyToken, IsAdmin, async (req, res) => {
  const adminId = req.verifiedUser._id;
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, req.body, {
      new: true,
    });

    return res.status(200).json(updatedAdmin);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
