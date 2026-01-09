const express = require("express");
const {
  getAllBlockchain,
  getBlockchain,
  castVote,
  validateChain,
  hasVoted,
} = require("../controllers/blockchainController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.route("/").get(protect, getAllBlockchain);
router.route("/castVote").post(castVote);
router.route("/hasVoted").get(protect, hasVoted);

router.route("/:id").get(getBlockchain);

router.route("/:id/validate").get(validateChain);

module.exports = router;
