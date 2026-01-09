const Blockchain = require("../models/blockchainModel");
const Campaign = require("../models/campaignModel");

exports.createCampaign = async function (req, res, next) {
  const newCampaign = await Campaign.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      campaign: newCampaign,
    },
  });
};

exports.getAllCampaigns = async function (req, res, next) {
  const campaigns = await Campaign.find();

  res.status(200).json({
    status: "success",
    data: {
      campaigns,
    },
  });
};

exports.getCampaigns = async function (req, res) {
  const campaigns = await Campaign.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      campaigns,
    },
  });
};

exports.deleteCampaigns = async function (req, res) {
  await Campaign.findByIdAndDelete(req.params.id);
  await Blockchain.deleteMany({ campaignId: `${req.params.id}` });

  res.status(200).json({
    status: "success",
    message: "Campaign successfully deleted!",
  });
};

exports.getResults = async function (req, res) {
  const campaigns = await Campaign.findById(req.params.id);
  const blocks = await Blockchain.find({ campaignId: req.params.id });

  const voteCount = {};
  blocks.forEach((b) => {
    voteCount[b.candidate.id] = (voteCount[b.candidate.id] || 0) + 1;
  });

  // Build new candidates list with votes injected
  const candidatesWithVotes = campaigns.candidates.map((c) => ({
    id: c.id,
    name: c?.name,
    party: c.party,
    candidateColor: c.candidateColor,
    votes: voteCount[c.id] || 0,
  }));

  let lead = null;
  let maxVotes = -1;

  campaigns.candidates = campaigns.candidates.map((c) => {
    const votes = voteCount[c.id] || 0;
    if (votes > maxVotes) {
      maxVotes = votes;
      lead = {
        id: c.id,
        name: c.name,
        party: c.party,
        candidateColor: c.candidateColor,
        votes,
      };
    }
    return { ...c, votes };
  });

  const newData = {
    totalVotes: blocks.length,
    candidates: candidatesWithVotes,
    leading: {
      name: lead.name,
      withVotes: lead.votes,
    },
  };

  res.status(200).json({
    status: "success",
    data: newData,
  });
};
