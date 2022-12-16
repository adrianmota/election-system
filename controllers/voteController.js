const ElectivePosition = require("../models/electivePosition");
const Candidate = require("../models/candidate");
const Vote = require("../models/vote");
const Politic = require("../models/politic");
const Election = require("../models/election");
const Citizen = require("../models/citizen");
// const ResultElection = require("../models/resultElection");

exports.getIndex = (req, res, next) => {
  if (!req.citizen.dataValues.status) {
    return res.render("vote/index", {
      title: "Votos",
      citizenIsNotActive: true
    });
  }

  Election.findOne({ where: { status: true } })
    .then((result) => {
      if (!result) {
        return res.render("vote/index", {
          title: "Votos",
          hasNoElection: true,
        });
      }

      ElectivePosition.findAll({ where: { status: true } })
        .then((result) => {
          const electivePositions = result.map((result) => result.dataValues);
          res.render("vote/index", {
            title: "Votos",
            electivePositions,
            hasElectivePositions: electivePositions.length > 0,
          });
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

exports.getCandidates = (req, res, next) => {
  const { electivePositionId } = req.params;

  if (!electivePositionId) {
    return res.redirect("/vote");
  }

  Candidate.findAll({
    where: { ElectivePositionId: electivePositionId },
    include: [{ model: ElectivePosition }, { model: Politic }],
  })
    .then((result) => {
      const candidates = result.map((result) => result.dataValues);
      res.render("vote/candidates", {
        title: "Candidatos",
        candidates,
        hasCandidates: candidates.length > 0,
      });
    })
    .catch((err) => console.error(err));
};

exports.postCreate = (req, res, next) => {
  let { candidateId } = req.body;

  Candidate.findOne({
    where: { id: candidateId },
    include: [{ model: ElectivePosition }, { model: Politic }],
  })
    .then((result) => {
      const candidate = result.dataValues;

      Election.findOne({ where: { status: true } })
        .then((result) => {
          const election = result.dataValues;
          candidateId = candidateId ? candidateId : null;

          Vote.create({
            CitizenId: req.citizen.dataValues.id,
            CandidateId: candidateId,
            PoliticId: candidate.PoliticId,
            ElectivePositionId: candidate.ElectivePositionId,
            ElectionId: election.id,
          })
            .then((result) => {
              console.log(result);
              res.redirect("/vote");
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

exports.getEndElection = (req, res, next) => {};
