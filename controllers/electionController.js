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
          const electionOrden = election.reverse((x) => x.id);

          res.render("elections/index", {
            title: "Elections",
            module: "elections",
            election: electionOrden,
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
            const electionOrden = election.reverse((x) => x.id);

            res.render("elections/index", {
              title: "Elections",
              module: "elections",
              election: electionOrden,
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
            const electionOrden = election.reverse((x) => x.id);

            res.render("elections/index", {
              title: "Elections",
              module: "elections",
              election: electionOrden,
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
                const electionOrden = election.reverse((x) => x.id);

                res.render("elections/index", {
                  title: "Elections",
                  module: "elections",
                  election: electionOrden,
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

  const fecha = Date.now();
  const now = new Date(fecha).toLocaleDateString();

  let { name, dateRealization } = req.body;

  if (dateRealization.split("-").length == 3) {
    const newDate = dateRealization.split("-");

    dateRealization = `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
  }

  console.log(dateRealization);
  if (!name || !dateRealization) {
    hasError = true;
    errorMessage = "Todos los campos son obligatorios.";
  }

  console.log(errorMessage);
  if (hasError) {
    Election.findOne({ where: { status: true } })
      .then((result) => {
        const hasElectionActive = result ? true : false;

        Election.findAll()
          .then((result) => {
            const election = result.map((result) => result.dataValues);
            const electionOrden = election.reverse((x) => x.id);

            res.render("elections/index", {
              title: "Elections",
              module: "elections",
              election: electionOrden,
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
    dateRealization: dateRealization,
    status: true,
  };

  console.log(electionVM.dateRealization);

  Election.findOne({ where: { status: true } })
    .then((result) => {
      if (result) {
        Election.findOne({ where: { status: true } })
          .then((result) => {
            const hasElectionActive = result ? true : false;

            Election.findAll()
              .then((result) => {
                const election = result.map((result) => result.dataValues);
                const electionOrden = election.reverse((x) => x.id);

                res.render("elections/index", {
                  title: "Elections",
                  module: "elections",
                  election: electionOrden,
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

      let responseDate = false;
      if (electionVM.dateRealization.split("/")[2] < now.split("/")[2]) {
        responseDate = true;
      } else if (
        electionVM.dateRealization.split("/")[2] == now.split("/")[2]
      ) {
        if (electionVM.dateRealization.split("/")[1] < now.split("/")[1]) {
          responseDate = true;
        } else if (
          electionVM.dateRealization.split("/")[1] == now.split("/")[1]
        ) {
          if (electionVM.dateRealization.split("/")[0] < now.split("/")[0]) {
            responseDate = true;
          }
        }
      }

      if (responseDate) {
        Election.findOne({ where: { status: true } })
          .then((result) => {
            const hasElectionActive = result ? true : false;

            Election.findAll()
              .then((result) => {
                const election = result.map((result) => result.dataValues);
                const electionOrden = election.reverse((x) => x.id);

                res.render("elections/index", {
                  title: "Elections",
                  module: "elections",
                  election: electionOrden,
                  hasElection: election.length > 0,
                  hasElectionActive: hasElectionActive,
                  hasError: true,
                  errorMessage:
                    "No se puede crear una eleccion con una fecha inferior a la actual.",
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

      ElectivePosition.findAll({ where: { status: true } })
        .then((result) => {
          const electivePositionActives = result.map(
            (result) => result.dataValues
          );

          if (electivePositionActives.length <= 3) {
            Election.findOne({ where: { status: true } })
              .then((result) => {
                const hasElectionActive = result ? true : false;
                Election.findAll()
                  .then((result) => {
                    const election = result.map((result) => result.dataValues);
                    const electionOrden = election.reverse((x) => x.id);

                    res.render("elections/index", {
                      title: "Elections",
                      module: "elections",
                      election: electionOrden,
                      hasElection: election.length > 0,
                      hasElectionActive: hasElectionActive,
                      hasError: true,
                      errorMessage:
                        "Para inicar una eleccion se debe tener al menos cuatros puesto electivos.",
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

          Candidate.findAll({
            include: [
              { model: Politic, where: { status: true } },
              { model: ElectivePosition, where: { status: true } },
            ],
            where: { status: true },
          })
            .then((result) => {
              const candidate = result.map((result) => result.dataValues);

              for (let x = 0; x < candidate.length; x++) {
                candidate[x].Politic = candidate[x].Politic.dataValues;
                candidate[x].ElectivePosition =
                  candidate[x].ElectivePosition.dataValues;
              }

              for (let y = 0; y < electivePositionActives.length; y++) {
                let countCandidate = candidate.filter(
                  (props) =>
                    props.ElectivePositionId == electivePositionActives[y].id
                );

                if (countCandidate.length < 2) {
                  hasError = true;
                  errorMessage = `Para realizar una eleccion se necesitan al menos dos candidatos activos en el puesto ${electivePositionActives[y].name} y que sus respectivos partidos tambien lo esten.`;
                }
              }

              if (hasError) {
                Election.findOne({ where: { status: true } })
                  .then((result) => {
                    const hasElectionActive = result ? true : false;
                    Election.findAll()
                      .then((result) => {
                        const election = result.map(
                          (result) => result.dataValues
                        );
                        const electionOrden = election.reverse((x) => x.id);

                        res.render("elections/index", {
                          title: "Elections",
                          module: "elections",
                          election: electionOrden,
                          hasElection: election.length > 0,
                          hasElectionActive: hasElectionActive,
                          hasError: true,
                          errorMessage:errorMessage                            
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
                    include: [
                      { model: ElectivePosition, where: { status: true } },
                      { model: Politic, where: { status: true } },
                    ],
                  })
                    .then((result) => {
                      let candidate = result.map((result) => result.dataValues);

                      for (let x = 0; candidate.length > x; x++) {
                        candidate[x].ElectivePosition =
                          candidate[x].ElectivePosition.dataValues;
                        candidate[x].Politic = candidate[x].Politic.dataValues;
                      }

                      for (let y = 0; candidate.length > y; y++) {
                        const item = {
                          fullName: `${candidate[y].firstName} ${candidate[y].lastName}`,
                          namePolitic: candidate[y].Politic.name,
                          nameElectivePosition:
                            candidate[y].ElectivePosition.name,
                          votes: 0,
                          ElectionId: hasElectionActive.id,
                          CandidateId: candidate[y].id,
                          PoliticId: candidate[y].Politic.id,
                          ElectivePositionId: candidate[y].ElectivePosition.id,
                        };

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
            const electionOrden = election.reverse((x) => x.id);

            res.render("elections/index", {
              title: "Elections",
              module: "elections",
              election: electionOrden,
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
                const electionOrden = election.reverse((x) => x.id);

                res.render("elections/index", {
                  title: "Elections",
                  module: "elections",
                  election: electionOrden,
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
                const electionOrden = election.reverse((x) => x.id);

                res.render("elections/index", {
                  title: "Elections",
                  module: "elections",
                  election: electionOrden,
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

      Election.update(electionVM, { where: { id: idElection } })
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
