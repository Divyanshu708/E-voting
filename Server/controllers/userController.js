const User = require("../models/userModel");

exports.getUser = async function (req, res, next) {
  const user = await User.findById(req.params.id).select("-password");

  if (!User) return new Error("User not found or doesn't exist");

  res.status(200).json({
    status: "success",
    data: user,
  });
};

exports.getAllUser = async function (req, res, next) {
  const allUser = await User.find();

  if (!allUser) return new Error("Users not found or user database is empty");

  res.status(200).json({
    status: "success",
    data: allUser,
  });
};

exports.getMe = async function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  const me = await User.findById(req.user.id).select("-password");

  res.status(200).json({
    status: "success",
    data: me,
  });
};
