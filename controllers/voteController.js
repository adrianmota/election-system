const ElectivePosition = require("../models/electivePosition");
const Candidate = require("../models/candidate");
const Vote = require("../models/vote");
const Politic = require("../models/politic");
const Election = require("../models/election");
const Citizen = require("../models/citizen");
const transporter = require("../services/mailService");

exports.getIndex = (req, res, next) => {
  if (!req.citizen.dataValues.status) {
    return res.render("vote/index", {
      title: "Votos",
      citizenIsNotActive: true,
    });
  }

  if (req.citizen.dataValues.voted) {
    return res.render("vote/index", {
      title: "Votos",
      hasCompletelyVoted: true,
      message:
        "Usted ya realizó su proceso de votación, no puede volver a realizar votos en este proceso electoral",
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
  let voted = false;

  if (!electivePositionId) {
    return res.redirect("/vote");
  }

  Election.findOne({ where: { status: true } })
    .then((result) => {
      const election = result.dataValues;

      Vote.findOne({
        where: {
          ElectivePositionId: electivePositionId,
          ElectionId: election.id,
          CitizenId: req.citizen.dataValues.id,
        },
      })
        .then((result) => {
          if (result) {
            voted = true;
          }
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));

  if (voted) {
    ElectivePosition.findAll({ where: { status: true } })
      .then((result) => {
        const electivePositions = result.map((result) => result.dataValues);
        res.render("vote/index", {
          title: "Votos",
          electivePositions,
          hasElectivePositions: electivePositions.length > 0,
          hasVotedInElectivePosition: true,
          message: "Usted ya ha votado en ese puesto, no puede volver a votar",
        });
      })
      .catch((err) => console.error(err));
    return;
  }

  Candidate.findAll({
    where: { ElectivePositionId: electivePositionId },
    include: [{ model: ElectivePosition }, { model: Politic }],
  })
    .then((result) => {
      const candidates = result.map((result) => result.dataValues);
      const none = {
        id: null,
        firstname: "Ninguno",
        lastname: "",
        ElectivePosition: {
          dataValues: {
            id: candidates[0].ElectivePosition.dataValues.id,
            name: "",
          },
        },
        Politic: {
          dataValues: {
            id: candidates[0].Politic.dataValues.id,
            name: "",
          },
        },
      };
      candidates.unshift(none);

      res.render("vote/candidates", {
        title: "Candidatos",
        candidates,
        hasCandidates: candidates.length > 0,
      });
    })
    .catch((err) => console.error(err));
};

exports.postCreate = (req, res, next) => {
  let { candidateId, electivePositionId, politicId } = req.body;

  if (!String(candidateId) == "null") {
    Election.findOne({ where: { status: true } })
      .then((result) => {
        const election = result.dataValues;

        Vote.create({
          CitizenId: req.citizen.dataValues.id,
          CandidateId: null,
          PoliticId: politicId,
          ElectivePositionId: electivePositionId,
          ElectionId: election.id,
        })
          .then((result) => {
            res.redirect("/vote");
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

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

exports.getEndVotation = (req, res, next) => {
  ElectivePosition.findAll()
    .then((result) => {
      const electivePositionsCount = result.map(
        (result) => result.dataValues
      ).length;

      Election.findOne({ where: { status: true } })
        .then((result) => {
          const election = result.dataValues;

          Vote.findAll({
            where: {
              ElectionId: election.id,
              CitizenId: req.citizen.dataValues.id,
            },
            include: [
              { model: Politic },
              { model: ElectivePosition },
              { model: Election },
            ],
          })
            .then((result) => {
              const votes = result.map((result) => result.dataValues);
              const votesCount = votes.length;

              if (votesCount != electivePositionsCount) {
                ElectivePosition.findAll({ where: { status: true } })
                  .then((result) => {
                    const electivePositions = result.map(
                      (result) => result.dataValues
                    );

                    res.render("vote/index", {
                      title: "Votos",
                      electivePositions,
                      hasElectivePositions: electivePositions.length > 0,
                      votationNotEnded: true,
                      message:
                        "Usted no ha terminado de votar, verifique los puestos electivos restantes por votar",
                    });
                  })
                  .catch((err) => console.error(err));

                return;
              }

              let votesPresentation = "";

              votes.forEach((vote) => {
                votesPresentation += `<tr>
                  <td>${vote.Candidate.dataValues.firstname} ${vote.Candidate.dataValues.lastname}</td>
                  <td>${vote.ElectivePosition.dataValues.name}</td>
                  <td>${vote.Politic.dataValues.name}</td>
                </tr>`;
              });

              transporter.sendMail({
                from: "Sistema de elecciones",
                to: req.citizen.dataValues.email,
                subject: `Resultados de sus votaciones en las elecciones ${new Date().getFullYear()}`,
                html: `<table>
                        <thead>
                          <th>Candidato</th>
                          <th>Puesto electivo</th>
                          <th>Partido</th>
                        </thead>
                        <tbody>
                          ${votesPresentation}
                        </tbody>
                      </table>`,
              });

              req.citizen.dataValues.voted = true;
              Citizen.update(
                { voted: true },
                { where: { id: req.citizen.dataValues.id } }
              )
                .then((result) => {
                  console.log(result);
                  return res.redirect("/vote/end");
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

exports.getEndVoteView = (req, res, next) => {
  if (!res.citizen.dataValues.voted) {
    return res.redirect("/vote");
  }

  return res.render("vote/end", {
    title: "Votación finalizada",
    votationEnded: true,
    message:
      "Su votación ha sido finalizada, revise la bandeja de entrada de su correo para ver los resultados",
  });
};