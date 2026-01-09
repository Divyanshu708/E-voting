const mongoose = require("mongoose");

const blockchainSchema = mongoose.Schema(
  {
    index: {
      type: Number,
      required: [true, "Index is required!"],
    },
    timestamp: { type: Date, default: Date.now },
    voterId: {
      type: String,
      required: [true, "voterId is required!"],
    },
    candidate: {
      id: { type: String, required: [true, "candidate Id is required!"] },
      name: { type: String, required: [true, "candidate Name is required!"] },
    },
    campaignId: {
      type: String,
      required: [true, "campaignId is required!"],
    },
    previousHash: {
      type: String,
      required: [true, "previousHash is required!"],
    },
    hash: {
      type: String,
      required: [true, "hash is required!"],
    },
  },

  { timestamps: { createdAt: false, updatedAt: false } }
);

blockchainSchema.index({ campaignId: 1 });

const Blockchain = mongoose.model("blocks", blockchainSchema);

module.exports = Blockchain;
