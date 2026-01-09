const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  voterId: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Voter Id is required!"],
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Name of the voter is required!"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    default: "$2b$12$ETagXSq7JlALlgBOK5gTyeAAx.6ZfRBy8/ZF35o4wo2DpS5TJHsiK",
    required: [true, "Password is required!"],
  },
});

userSchema.methods.correctPassword = async function (
  password,
  currentPassword
) {
  return await bcrypt.compare(password, currentPassword);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
