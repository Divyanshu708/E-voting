const crypto = require("crypto");

function computeHash(block) {
  const data = `${block.index}${block.campaignId}${block.voterId}${block.candidate.id}${block.candidate.name}${block.previoushash}${block.timestamp}`;

  return crypto.createHash("sha256").update(data).digest("hex");
}

module.exports = computeHash;
