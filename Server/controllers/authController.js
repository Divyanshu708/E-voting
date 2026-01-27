const User = require("../models/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.login = async function (req, res, next) {
  const { voterId, password } = req.body;

  if (!voterId || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Provide email or password",
    });
  }

  const user = await User.findOne({ voterId });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "User Not Found",
    });
  }

  const correct = await user.correctPassword(password, user.password);

  if (!correct) {
    return res.status(400).json({
      status: "fail",
      message: "Password Incorrect",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
  });

  user.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    user,
  });
};

exports.logout = async function (req, res, next) {
  res.clearCookie("jwt", {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
  });

  res.status(200).json({ status: "success" });
};

exports.protect = async function (req, res, next) {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token || token == "{{jwt}}") {
      return res.status(401).json({ message: "Not logged in" });
    }

    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decode.id);

    if (!currentUser) {
      return res
        .status(401)
        .json({ message: "The user belonging to this token no longer exists" });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
