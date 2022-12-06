const Candidate = require("../models/candidate");
const ElectivePosition = require("../models/electivePosition");
const Politic = require("../models/politic");

exports.getIndex = (req, res, next) => {
  Candidate.findAll({
    include: [{ model: Politic }, { model: ElectivePosition }],
  })
    .then((result) => {
      const candidate = result.map((result) => result.dataValues);

      Politic.findAll({ where: { status: true } })
        .then((result) => {
          const politic = result.map((result) => result.dataValues);

          ElectivePosition.findAll({ where: { status: true } })
            .then((result) => {
              const electivePosition = result.map(
                (result) => result.dataValues
              );

              res.render("candidate/index", {
                pageTitle: "Candidate",
                module: "candidate",
                hasCandidate: candidate.length > 0,
                candidate: candidate,                      
                politic: politic,
                hasPolitic: politic.length > 0,
                electivePosition: electivePosition,
                hasElectivePosition: electivePosition.length > 0,
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
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createCandidatePost = (req, res, next) => {
  let hasError = false;
  let errorMessage = "";

  const { firstName, lastName, politicId, electivePositionId } = req.body;
  const profilePhoto = req.file;

  const candidateVM = {
    firstName: firstName,
    lastName: lastName,
    profilePhoto: profilePhoto,
    status: true,
    politicId: politicId,
    electivePositionId: electivePositionId,
  };

  if (
    !firstName ||
    !lastName ||
    !politicId ||
    !electivePositionId ||
    !profilePhoto
  ) {
    hasError = true;
    errorMessage = "Todos los campos son obligatorios";
  }
  console.log(errorMessage);

  if (hasError) {
    Candidate.findAll({
      include: [{ model: Politic }, { model: ElectivePosition }],
    })
      .then((result) => {
        const candidate = result.map((result) => result.dataValues);

        Politic.findAll({ where: { status: true } })
          .then((result) => {
            const politic = result.map((result) => result.dataValues);

            ElectivePosition.findAll({ where: { status: true } })
              .then((result) => {
                const electivePosition = result.map(
                  (result) => result.dataValues
                );

                res.render("candidate/index", {
                  pageTitle: "Candidate",
                  module: "candidate",
                  hasCandidate: candidate.length > 0,
                  candidate: candidate,                      
                  politic: politic,
                  hasPolitic: politic.length > 0,
                  electivePosition: electivePosition,
                  hasElectivePosition: electivePosition.length > 0, 
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
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }

  Politic.findOne({ where: { id: politicId } }).then((result) => {
    if (!result.dataValues.status) {
      hasError = true;
      errorMessage = "Este partido no esta disponible.";
    }

    console.log(errorMessage);

    if (hasError) {
      Candidate.findAll({
        include: [{ model: Politic }, { model: ElectivePosition }],
      })
        .then((result) => {
          const candidate = result.map((result) => result.dataValues);

          Politic.findAll({ where: { status: true } })
            .then((result) => {
              const politic = result.map((result) => result.dataValues);

              ElectivePosition.findAll({ where: { status: true } })
                .then((result) => {
                  const electivePosition = result.map(
                    (result) => result.dataValues
                  );

                  res.render("candidate/index", {
                    pageTitle: "Candidate",
                    module: "candidate",
                    hasCandidate: candidate.length > 0,
                    candidate: candidate,                      
                    politic: politic,
                    hasPolitic: politic.length > 0,
                    electivePosition: electivePosition,
                    hasElectivePosition: electivePosition.length > 0,
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
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    ElectivePosition.findOne({ where: { id: electivePositionId } })
      .then((result) => {
        if (!result.dataValues.status) {
          hasError = true;
          errorMessage = "Este puesto electivo no esta disponible.";
        }

        console.log(errorMessage);

        if (hasError) {
          Candidate.findAll({
            include: [{ model: Politic }, { model: ElectivePosition }],
          })
            .then((result) => {
              const candidate = result.map((result) => result.dataValues);

              Politic.findAll({ where: { status: true } })
                .then((result) => {
                  const politic = result.map((result) => result.dataValues);

                  ElectivePosition.findAll({ where: { status: true } })
                    .then((result) => {
                      const electivePosition = result.map(
                        (result) => result.dataValues
                      );

                      res.render("candidate/index", {
                        pageTitle: "Candidate",
                        module: "candidate",
                        hasCandidate: candidate.length > 0,
                        candidate: candidate,                      
                        politic: politic,
                        hasPolitic: politic.length > 0,
                        electivePosition: electivePosition,
                        hasElectivePosition: electivePosition.length > 0,
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
            })
            .catch((err) => {
              console.log(err);
            });
          return;
        }

        Candidate.create(candidateVM)
          .then((result) => {
            res.redirect("/admin/candidate");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.editCandidatePost = (req, res, next) => {
  let hasError = false;
  let errorMessage = "";

  const { id, firstName, lastName, politicId, electivePositionId } = req.body;
  const profilePhoto = req.file;

  const candidateVM = {
    id:id,
    firstName: firstName,
    lastName: lastName,
    profilePhoto: profilePhoto,
    status: true,
    politicId: politicId,
    electivePositionId: electivePositionId,
  };

  if (
    !firstName ||
    !lastName ||
    !politicId ||
    !electivePositionId ||
    !profilePhoto
  ) {
    hasError = true;
    errorMessage = "Todos los campos son obligatorios";
  }
  console.log(errorMessage);

  if (hasError) {
    Candidate.findAll({
      include: [{ model: Politic }, { model: ElectivePosition }],
    })
      .then((result) => {
        const candidate = result.map((result) => result.dataValues);

        Politic.findAll({ where: { status: true } })
          .then((result) => {
            const politic = result.map((result) => result.dataValues);

            ElectivePosition.findAll({ where: { status: true } })
              .then((result) => {
                const electivePosition = result.map(
                  (result) => result.dataValues
                );

                res.render("candidate/index", {
                  pageTitle: "Candidate",
                  module: "candidate",
                  hasCandidate: candidate.length > 0,
                  candidate: candidate,                      
                  politic: politic,
                  hasPolitic: politic.length > 0,
                  electivePosition: electivePosition,
                  hasElectivePosition: electivePosition.length > 0,
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
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }

  Candidate.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        hasError = true;
        errorMessage = "Este candidato no existe.";
      }
      console.log(errorMessage);
      if (hasError) {
        Candidate.findAll({
          include: [{ model: Politic }, { model: ElectivePosition }],
        })
          .then((result) => {
            const candidate = result.map((result) => result.dataValues);

            Politic.findAll({ where: { status: true } })
              .then((result) => {
                const politic = result.map((result) => result.dataValues);

                ElectivePosition.findAll({ where: { status: true } })
                  .then((result) => {
                    const electivePosition = result.map(
                      (result) => result.dataValues
                    );

                    res.render("candidate/index", {
                      pageTitle: "Candidate",
                      module: "candidate",
                      hasCandidate: candidate.length > 0,
                      candidate: candidate,                      
                      politic: politic,
                      hasPolitic: politic.length > 0,
                      electivePosition: electivePosition,
                      hasElectivePosition: electivePosition.length > 0,
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
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }

      Politic.findOne({where:{id:politicId}}).then((result)=>{
        if (!result) {
            hasError = true;
            errorMessage = "Este partido no existe.";
          }
          console.log(errorMessage);
          if (hasError) {
            Candidate.findAll({
              include: [{ model: Politic }, { model: ElectivePosition }],
            })
              .then((result) => {
                const candidate = result.map((result) => result.dataValues);
    
                Politic.findAll({ where: { status: true } })
                  .then((result) => {
                    const politic = result.map((result) => result.dataValues);
    
                    ElectivePosition.findAll({ where: { status: true } })
                      .then((result) => {
                        const electivePosition = result.map(
                          (result) => result.dataValues
                        );
    
                        res.render("candidate/index", {
                          pageTitle: "Candidate",
                          module: "candidate",
                          hasCandidate: candidate.length > 0,
                          candidate: candidate,                      
                          politic: politic,
                          hasPolitic: politic.length > 0,
                          electivePosition: electivePosition,
                          hasElectivePosition: electivePosition.length > 0,
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
              })
              .catch((err) => {
                console.log(err);
              });
            return;
          }    

        ElectivePosition.findOne({where:{id:electivePositionId}}).then((result)=>{
            if (!result) {
                hasError = true;
                errorMessage = "Este puesto electivo no existe.";
              }
              console.log(errorMessage);
              if (hasError) {
                Candidate.findAll({
                  include: [{ model: Politic }, { model: ElectivePosition }],
                })
                  .then((result) => {
                    const candidate = result.map((result) => result.dataValues);
        
                    Politic.findAll({ where: { status: true } })
                      .then((result) => {
                        const politic = result.map((result) => result.dataValues);
        
                        ElectivePosition.findAll({ where: { status: true } })
                          .then((result) => {
                            const electivePosition = result.map(
                              (result) => result.dataValues
                            );
        
                            res.render("candidate/index", {
                              pageTitle: "Candidate",
                              module: "candidate",
                              hasCandidate: candidate.length > 0,
                              candidate: candidate,                      
                              politic: politic,
                              hasPolitic: politic.length > 0,
                              electivePosition: electivePosition,
                              hasElectivePosition: electivePosition.length > 0,
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
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                return;
              }   
            Candidate.update({candidateVM},{where:{id:candidateVM.id}}).then((result)=>{                
                res.status(302).redirect("/admin/candidate")
            }).catch((err)=>{
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err);
        })
      }).catch((err)=>{
        console.log(err);
      });

    })
    .catch((err) => {
      console.log(err);
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.changeStatusCandidate = (req, res, next) => {
  let hasError = false;
  let errorMessage = "";
  const candidateId = req.params.idCandidate;

  Candidate.findOne({ where: { id: candidateId } })
    .then((result) => {
      const candidateVM = result.dataValues;

      if (!candidateVM) {
        hasError = true;
        errorMessage="No se ha encontrado el candidato."
      }

      if (hasError) {
        Candidate.findAll({
          include: [{ model: Politic }, { model: ElectivePosition }],
        })
          .then((result) => {
            const candidate = result.map((result) => result.dataValues);

            Politic.findAll({ where: { status: true } })
              .then((result) => {
                const politic = result.map((result) => result.dataValues);

                ElectivePosition.findAll({ where: { status: true } })
                  .then((result) => {
                    const electivePosition = result.map(
                      (result) => result.dataValues
                    );

                    res.render("candidate/index", {
                      pageTitle: "Candidate",
                      module: "candidate",
                      hasCandidate: candidate.length > 0,
                      candidate: candidate,                      
                      politic: politic,
                      hasPolitic: politic.length > 0,
                      electivePosition: electivePosition,
                      hasElectivePosition: electivePosition.length > 0,
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
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }    

      candidateVM.status = !candidateVM.status;
      Candidate.update(candidateVM,{ where: { id: candidateVM.id } })
        .then((result) => {
          return res.redirect("/admin/candidate");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
