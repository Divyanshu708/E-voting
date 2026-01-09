const express = require("express");
const { getUser, getAllUser, getMe } = require("../controllers/userController");
const { logout, login, protect } = require("../controllers/authController");

const router = express.Router();

router.route("/").get(protect, getAllUser);

router.route("/me").get(protect, getMe);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/:id").get(getUser);

module.exports = router;
