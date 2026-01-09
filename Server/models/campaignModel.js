const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    campaignName: {
      type: String,
      required: [true, "Campaign Name is Required"],
      trim: true,
    },

    campaignColor: {
      type: String,
      default: "hsl(0 0 90)",
    },

    candidates: [
      {
        id: String,
        name: {
          type: String,
          trim: true,
          required: [true, "Candidates Name can't be empty!"],
        },
        party: String,
        candidateColor: String,
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],

    active: {
      type: String,
      default: "open",
      enum: {
        values: ["open", "close"],
        message:
          "only 'open' and 'close' values are accepted to show active status!",
      },
    },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: false, updatedAt: false } }
);

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
