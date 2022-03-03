const Address = require("../models/address.models");
const User = require("../models/user.models");

const createAddress = async (req, res) => {
  //console.log(req.verifiedUser);
  const createAddress = new Address({
    street: req.body.street,
    city: req.body.city,
    country: req.body.country,
    zipCode: req.body.zipCode,
  });
  try {
    const savedAddress = await createAddress.save();
    // console.log(saverAddress)

    // const user =await User.findById(id)
    //console.log(user)
    // user.address=savedAddress._id;
    // await user.save()
    //

    return res.status(201).json(savedAddress);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getAddress = async (req, res) => {
  const id = req.params.addressId;
  try {
    const getAddress = await Address.findById(id);
    return res.status(200).json(getAddress);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const meAddresses = async (req, res) => {
  const addressId=req.verifiedUser.address
  try {
      const address = await Address.findById(addressId);
      return res.status(200).json(address);
  } catch (err) {
      return res.status(500).json(err);
  }
};




const getAddresses = async (req, res) => {
  try {
    const getAddresses = await Address.find();
    return res.status(200).json(getAddresses);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateAddress = async (req, res) => {
  const id = req.params.addressId;
  try {
    const updateAddress = await Address.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateAddress);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const deleteAddress = async (req, res) => {
  const id = req.params.addressId;
  try {
    const deleteAddress = await Address.findByIdAndDelete(id);
    return res.status(200).json(deleteAddress);
  } catch (err) {
    return res.status(500).json(err);
  }
};


module.exports.meAddresses = meAddresses;


module.exports.createAddress = createAddress;
module.exports.getAddress = getAddress;
module.exports.getAddresses = getAddresses;
module.exports.updateAddress = updateAddress;
module.exports.deleteAddress = deleteAddress;
