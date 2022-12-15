const Election = require("../models/election");
const Vote = require("../models/vote");
const Candidate = require("../models/candidate");
const Politic = require("../models/politic");
const ElectivePosition = require("../models/electivePosition");
const ResultElection = require("../models/resultElection");

exports.getIndex = (req, res, next) => {
  Election.findOne({ where: { status: true } })
    .then((result) => {
      const hasElectionActive = result ? true : false;

      Election.findAll()
        .then((result) => {
          const election = result.map((result) => result.dataValues);

          res.render("elections/index", {
            title: "Elections",
            module: "elections",
            election: election,
            hasElection: election.length > 0,
            hasElectionActive: hasElectionActive,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getResult = (req, res, next) => {
  const idElection = req.params.idElection;

  if (!idElection) {
    Election.findOne({ where: { status: true } })
      .then((result) => {
        const hasElectionActive = result ? true : false;

        Election.findAll()
          .then((result) => {
            const election = result.map((result) => result.dataValues);

            res.render("elections/index", {
              title: "Elections",
              module: "elections",
              election: election,
              hasElection: election.length > 0,
              hasElectionActive: hasElectionActive,
              hasError: true,
              errorMessage:
                "Hacen falta valores para poder buscar la eleccion.",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }

  Vote.findOne({
    include: [
      { model: Candidate },
      { model: ElectivePosition },
      { model: Politic },
    ],
    where: { id: 2 },
  })
    .then((result) => {
      if (!result) {
        Election.findAll()
          .then((result) => {
            const election = result.map((result) => result.dataValues);

            res.render("elections/index", {
              title: "Elections",
              module: "elections",
              election: election,
              hasElection: election.length > 0,
              hasError: true,
              errorMessage: "No se pudo encontrar la eleccion seleccionada.",
            });
          })
          .catch((err) => {
            console.log(err);
          });
        Election.findOne({ where: { status: true } })
          .then((result) => {
            const hasElectionActive = result ? true : false;

            Election.findAll()
              .then((result) => {
                const election = result.map((result) => result.dataValues);

                res.render("elections/index", {
                  title: "Elections",
                  module: "elections",
                  election: election,
                  hasElection: election.length > 0,
                  hasElectionActive: hasElectionActive,
                  hasError: true,
                  errorMessage:
                    "No se pudo encontrar la eleccion seleccionada.",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }

      const vote = result.dataValues;

      res.render("elections/index", {
        title: "Elections",
        module: "elections",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createElection = (req, res, next) => {
  let hasError = false;
  let errorMessage = "";

  const { name, dateRealization } = req.body;

  if (!name || !dateRealization) {
    hasError = true;
    errorMessage = "Todos los campos son obligatorios,";
  }

  console.log(errorMessage);
  if (hasError) {
    Election.findOne({ where: { status: true } })
      .then((result) => {
        const hasElectionActive = result ? true : false;

        Election.findAll()
          .then((result) => {
            const election = result.map((result) => result.dataValues);

            res.render("elections/index", {
              title: "Elections",
              module: "elections",
              election: election,
              hasElection: election.length > 0,
              hasElectionActive: hasElectionActive,
              hasError: hasError,
              errorMessage: errorMessage,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }

  const electionVM = {
    name: name,
    dateRealization: new Date(dateRealization).toLocaleDateString(),
    status: true,
  };

  Election.findOne({ where: { status: true } })
    .then((result) => {
      if (result) {
        console.log("Ya existe una eleccion activa");
        Election.findOne({ where: { status: true } })
          .then((result) => {
            const hasElectionActive = result ? true : false;

            Election.findAll()
              .then((result) => {
                const election = result.map((result) => result.dataValues);

                res.render("elections/index", {
                  title: "Elections",
                  module: "elections",
                  election: election,
                  hasElection: election.length > 0,
                  hasElectionActive: hasElectionActive,
                  hasError: true,
                  errorMessage: "Ya hay una eleccion activa",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }

      Election.create(electionVM)
        .then((result) => {
          const hasElectionActive = result.dataValues;

          Candidate.findAll({
            where: { status: true },
            include: [{ model: ElectivePosition }, { model: Politic }],
          })
            .then((result) => {
              let candidate = result.map((result) => result.dataValues);

              for (let x = 0; candidate.length > x; x++) {
                candidate[x].ElectivePosition =
                  candidate[x].ElectivePosition.dataValues;
                candidate[x].Politic = candidate[x].Politic.dataValues;
              }

              candidate = candidate.filter(
                (props) =>
                  props.ElectivePosition.status == true &&
                  props.Politic.status == true
              );

              for (let y = 0; candidate.length > y; y++) {
                const item = {
                  fullName: `${candidate[y].firstName} ${candidate[y].lastName}`,
                  namePolitic: candidate[y].Politic.name,
                  nameElectivePosition: candidate[y].ElectivePosition.name,
                  votes: 0,
                  ElectionId: hasElectionActive.id,
                  CandidateId: candidate[y].id,
                  PoliticId: candidate[y].Politic.id,
                  ElectivePositionId: candidate[y].ElectivePosition.id,
                };
                console.log(item);
                ResultElection.create(item)
                  .then((result) => {
                    console.log(result.dataValues);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }

              res.redirect("/admin/election");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.closedElection = (req, res, next) => {
  const idElection = req.params.idElection;

  if (!idElection) {
    Election.findOne({ where: { status: true } })
      .then((result) => {
        const hasElectionActive = result ? true : false;
        Election.findAll()
          .then((result) => {
            const election = result.map((result) => result.dataValues);
            res.render("elections/index", {
              title: "Elections",
              module: "elections",
              election: election,
              hasElection: election.length > 0,
              hasElectionActive: hasElectionActive,
              hasError: true,
              errorMessage: "Los datos proporcionados son incorrectos.",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }

  Election.findOne({ where: { id: idElection } })
    .then((result) => {
      if (!result) {
        Election.findOne({ where: { status: true } })
          .then((result) => {
            const hasElectionActive = result ? true : false;
            Election.findAll()
              .then((result) => {
                const election = result.map((result) => result.dataValues);
                res.render("elections/index", {
                  title: "Elections",
                  module: "elections",
                  election: election,
                  hasElection: election.length > 0,
                  hasElectionActive: hasElectionActive,
                  hasError: true,
                  errorMessage:
                    "No se ha podido encontrar la eleccion seleccionada",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }

      const electionVM = result.dataValues;

      if (!electionVM.status) {
        Election.findOne({ where: { status: true } })
          .then((result) => {
            const hasElectionActive = result ? true : false;
            Election.findAll()
              .then((result) => {
                const election = result.map((result) => result.dataValues);
                res.render("elections/index", {
                  title: "Elections",
                  module: "elections",
                  election: election,
                  hasElection: election.length > 0,
                  hasElectionActive: hasElectionActive,
                  hasError: true,
                  errorMessage: "Esta eleccion ya fue finalizada.",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }

      electionVM.status = false;

      Election.update(electionVM)
        .then((result) => {
          res.redirect("/admin/election");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
