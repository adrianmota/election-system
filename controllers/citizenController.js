const Citizen = require("../models/citizen");

exports.getIndex = (req, res, next) => {
  Citizen.findAll()
    .then((result) => {
      const citizen = result.map((result) => result.dataValues);

      res.render("citizen/index", {
        title: "Citizen",
        module: "citizen",
        citizen: citizen,
        hasCitizen: citizen.length > 0,
        hasError: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createCitizenPost = (req, res, next) => {
  let hasError = false;
  let errorMessage = "";

  const { documentId, firstName, lastName, email } = req.body;

  if (!documentId || !firstName || !lastName || !email) {
    hasError = true;
    errorMessage = "Todos los campos son obligatorios";
  }
  console.log(errorMessage);

  if (hasError) {
    Citizen.findAll()
      .then((result) => {
        const citizen = result.map((result) => result.dataValues);

        res.render("citizen/index", {
          pageTitle: "Citizen",
          module: "citizen",
          hasCitizen: citizen.length > 0,
          citizen: citizen,
          hasError: hasError,
          errorMessage: errorMessage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }

  Citizen.findOne({ where: { documentId } }).then((result) => {
    if (result) {
      hasError = true;
      errorMessage = "Este ciudadano ya existe.";
    }

    console.log(errorMessage);

    if (hasError) {
      Citizen.findAll()
        .then((result) => {
          const citizen = result.map((result) => result.dataValues);

          res.render("citizen/index", {
            pageTitle: "Citizen",
            module: "citizen",
            hasCitizen: citizen.length > 0,
            citizen: citizen,
            hasError: hasError,
            errorMessage: errorMessage,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    Citizen.findOne({ where: { email } })
      .then((result) => {
        if (result) {
          hasError = true;
          errorMessage = "Este correo ya existe.";
        }

        if (hasError) {
          Citizen.findAll()
            .then((result) => {
              const citizen = result.map((result) => result.dataValues);

              res.render("citizen/index", {
                pageTitle: "Citizen",
                module: "citizen",
                hasCitizen: citizen.length > 0,
                citizen: citizen,
                hasError: hasError,
                errorMessage: errorMessage,
              });
            })
            .catch((err) => {
              console.log(err);
            });
          return;
        }

        Citizen.create({
          documentId,
          firstName,
          lastName,
          email,
          status: true,
        })
          .then((result) => {
            res.redirect("/admin/citizen");
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

exports.editCitizenPost = (req, res, next) => {
  let hasError = false;
  let errorMessage = "";

  const { id, documentId, firstName, lastName, email, status } = req.body;

  console.log(req.body);
  if (!documentId || !firstName || !lastName || !email || !status) {
    hasError = true;
    errorMessage = "Todos los campos son obligatorios";
  }

  if (hasError) {
    Citizen.findAll()
      .then((result) => {
        const citizen = result.map((result) => result.dataValues);

        res.render("citizen/index", {
          pageTitle: "Citizen",
          module: "citizen",
          hasCitizen: citizen.length > 0,
          citizen: citizen,
          hasError: hasError,
          errorMessage: errorMessage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }

  Citizen.findOne({ where: { documentId } })
    .then((result) => {
      if (result) {
        if (result.dataValues.id != id) {
          hasError = true;
          errorMessage = "Este ciudadano ya existe.";
        }
      }
      console.log(errorMessage);

      if (hasError) {
        Citizen.findAll()
          .then((result) => {
            const citizen = result.map((result) => result.dataValues);

            res.render("citizen/index", {
              pageTitle: "Citizen",
              module: "citizen",
              hasCitizen: citizen.length > 0,
              citizen: citizen,
              hasError: hasError,
              errorMessage: errorMessage,
            });
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }

      Citizen.findOne({ where: { email } })
        .then((result) => {
          if (result) {
            if (result.dataValues.id != id) {
              hasError = true;
              errorMessage = "Este correo ya existe.";
            }
          }

          console.log(errorMessage);

          if (hasError) {
            Citizen.findAll()
              .then((result) => {
                const citizen = result.map((result) => result.dataValues);

                res.render("citizen/index", {
                  pageTitle: "Citizen",
                  module: "citizen",
                  hasCitizen: citizen.length > 0,
                  citizen: citizen,
                  hasError: hasError,
                  errorMessage: errorMessage,
                });
              })
              .catch((err) => {
                console.log(err);
              });
            return;
          }
          Citizen.findOne({ where: { id: id } })
            .then((result) => {
              if (result == null) {
                hasError = true;
                errorMessage = "Este ciudadano no se ha encontrado";
              }

              if (hasError) {
                Citizen.findAll()
                  .then((result) => {
                    const citizen = result.map((result) => result.dataValues);

                    res.render("citizen/index", {
                      pageTitle: "Citizen",
                      module: "citizen",
                      hasCitizen: citizen.length > 0,
                      citizen: citizen,
                      hasError: hasError,
                      errorMessage: errorMessage,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                return;
              }
              Citizen.update(
                {
                  documentId,
                  firstName,
                  lastName,
                  email,
                  status: status,
                },
                {
                  where: { id },
                }
              )
                .then((result) => {
                  return res.redirect("/admin/Citizen");
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
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.changeStatusCitizen = (req, res, next) => {
  const citizenId = req.params.idCitizen;

  Citizen.findOne({ where: { id: citizenId } })
    .then((result) => {
      const citizenVM = result.dataValues;

      if (!citizenVM) {
        Citizen.findAll()
          .then((result) => {
            const citizen = result.map((result) => result.dataValues);

            res.render("citize/index", {
              pageTitle: "Citizen",
              module: "citizen",
              hasCitizen: citizen.length > 0,
              citizen: citizen,
              hasError: true,
              errorMessage: "Ciudadano no encontrado.",
            });
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }
      citizenVM.status = !citizenVM.status;
      Citizen.update(
        {
          firstName: citizenVM.firstName,
          lastName: citizenVM.lastName,
          id: citizenVM.id,
          email: citizenVM.email,
          status: citizenVM.status,
        },
        { where: { id: citizenVM.id } }
      )
        .then((result) => {
          return res.redirect("/admin/Citizen");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
