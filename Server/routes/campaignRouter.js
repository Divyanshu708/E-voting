const express = require("express");
const {
  getAllCampaigns,
  createCampaign,
  getCampaigns,
  deleteCampaigns,
  getResults,
} = require("../controllers/campaignController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.route("/").get(getAllCampaigns);
router.route("/").post(protect, createCampaign);

router.route("/:id").get(getCampaigns).delete(deleteCampaigns);

router.route("/:id/results").get(getResults);

module.exports = router;
