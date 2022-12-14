const ElectivePosition = require("../models/electivePosition");
const Candidate = require("../models/candidate");
const Vote = require("../models/vote");
const Politic = require("../models/politic");
const Election = require("../models/election");

exports.getIndex = (req, res, next) => {
  ElectivePosition.findAll({ where: { status: true } })
    .then((result) => {
      const electivePositions = result.map((result) => result.dataValues);
      res.render("home/index", {
        title: "Votos",
        electivePositions,
        hasElectivePositions: electivePositions.length > 0,
      });
    })
    .catch((err) => console.error(err));
};

exports.getCandidates = (req, res, next) => {
  const { electivePositionId } = req.params;
  console.log(electivePositionId);

  if (!electivePositionId) {
    return res.redirect("/vote");
  }

  ElectivePosition.findOne({
    where: { id: electivePositionId },
    include: [{ model: Candidate }],
  })
    .then((result) => {
      const candidates = result.Candidates;
      console.log(candidates);
      res.render("vote/candidates", {
        title: "Candidatos",
        candidates,
        hasCandidates: candidates.length > 0,
      });
    })
    .catch((err) => console.error(err));
};

exports.postGenerateVote = (req, res, next) => {
  const { candidateId } = req.body;

  if (!candidateId) {
    res.redirect("/vote");
  }

  Candidate.findOne({
    where: { id: candidateId },
    include: [{ model: ElectivePosition }, { model: Politic }],
  })
    .then((result) => {
      Election.findOne({ where: { status: true } })
        .then((result) => {
          const election = result.dataValues;
          console.log(election);
          res.redirect("/vote");
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};
