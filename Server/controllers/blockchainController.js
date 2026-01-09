const io = require("../server");
const Blockchain = require("../models/blockchainModel");
const Campaign = require("../models/campaignModel");
const computeHash = require("../utils/computeHash");
const User = require("../models/userModel");

exports.getBlockchain = async function (req, res) {
  const data = await Blockchain.find({ campaignId: req.params.id });

  res.status(200).json({ status: "success", data });
};

exports.getAllBlockchain = async function (req, res) {
  const data = await Blockchain.find();

  res.status(200).json({ status: "success", data });
};

exports.castVote = async function (req, res) {
  const lastBlock = await Blockchain.findOne({
    campaignId: req.body.campaignId,
  }).sort({
    index: -1,
  });

  const newIndex = lastBlock ? lastBlock.index + 1 : 0;
  const previousHash = lastBlock ? lastBlock.hash : `${crypto.randomUUID()}`;

  const newBlockData = {
    index: newIndex,
    campaignId: req.body.campaignId,
    voterId: req.body.voterId,
    candidate: {
      id: req.body.candidate.id,
      name: req.body.candidate.name,
    },
    previousHash,
    timestamp: Date(),
  };
  // console.log(newBlockData);

  newBlockData.hash = computeHash(newBlockData);

  await Blockchain.create(newBlockData);

  req.io.emit("resultUpdated", {
    campaignId: req.body.campaignId,
  });

  res.status(200).json({
    status: "success",
    message: "Block created!",
  });
};

exports.validateChain = async function (req, res, next) {
  const blocks = await Blockchain.find({ campaignId: req.params.id });
  const campaign = await Campaign.findById({ _id: req.params.id }).select(
    "campaignName"
  );

  if (blocks.length === 0 || blocks.length === 1) {
    res.status(200).json({
      status: "Success",
      data: [
        {
          message: ` 🚫Not Enough Blocks to Re-Validate`,
          color: `#ad0d0d`,
        },
      ],
    });
  }

  const msg = [];
  const arr = [];

  for (let i = 1; i < blocks.length; i++) {
    const prev = blocks[i - 1];
    const curr = blocks[i];

    if (curr.index !== prev.index + 1) {
      msg.push({ blockIndex: curr.index, reason: "(Index sequence mismatch)" });
    }

    if (curr.previousHash !== prev.hash) {
      msg.push({
        blockIndex: curr.index,
        reason: "(Broken previousHash link)",
      });
    }

    const recalculatedHash = computeHash(curr);

    if (curr.hash !== recalculatedHash) {
      msg.push({
        blockIndex: curr.index,
        reason: `Date Tampered at index: ${curr.index} (Hash mismatched)`,
      });
    }
  }

  if (msg.length === 0) {
    res.status(200).json({
      status: "success",
      data: [
        {
          message: `Campaign '${campaign.campaignName}': Blockchain is valid, No data is tampered`,
          color: `#00a732`,
        },
      ],
    });
  } else {
    msg.forEach((error) =>
      arr.push({
        message: `Block #${error.blockIndex}: ${error.reason}`,
        color: `#ad0d0d`,
      })
    );

    res.status(200).json({
      status: "success",
      data: arr,
    });
  }

  next();
};

exports.hasVoted = async function (req, res, next) {
  const block = await Blockchain.findOne({
    voterId: req.user.voterId,
    campaignId: req.query.campaignId,
  });

  res.status(200).json({
    hasVoted: !!block,
  });
};
