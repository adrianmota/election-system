const Citizen = require("../models/citizen");

exports.getIndex = (req, res, next) => {
  Citizen.findAll()
    .then((result) => {
      const citizen = result.map((result) => result.dataValues);

      res.render("citizen/index", {
        pageTitle: "Citizen",
        module: "citizen",
        hasCitizen: citizen.length > 0,
        citizen: citizen,
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

  console.log(req.body);
  const { DocumentId, FirstName, LastName, Email } = req.body;

  if (!DocumentId || !FirstName || !LastName || !Email) {
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

  Citizen.findOne({ where: { documentId: DocumentId } }).then((result) => {
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

    Citizen.findOne({ where: { email: Email } })
      .then((result) => {
        if (result) {
          hasError = true;
          errorMessage = "Este correo ya existe.";
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

        Citizen.create({
          documentId: DocumentId,
          firstName: FirstName,
          lastName: LastName,
          email: Email,
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

  const { Id, DocumentId, FirstName, LastName, Email, Status } = req.body;

  console.log(req.body);
  if (!DocumentId || !FirstName || !LastName || !Email || !Status) {
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

  Citizen.findOne({ where: { id: Id } })
    .then((result) => {
      if (result) {
        if(result.dataValues.documentId != DocumentId){
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

      Citizen.findOne({ where: { id: Id } })
        .then((result) => {
          if (result) {

            if(result.dataValues.email != Email ){
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
          Citizen.findOne({ where: { id: Id } })
            .then((result) => {

              if (result == null) {
                hasError = true;
                errorMessage = "Este ciudadano no se ha encontrado";
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
              Citizen.update(
                {
                  documentId: DocumentId,
                  firstName: FirstName,
                  lastName: LastName,
                  email: Email,
                  status: Status,
                },
                {
                  where: { id: Id },
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
              errorMessage: "Citizen not found.",
            });
          })
          .catch((err) => {
            console.log(err);
          });
          return;
      }
      citizenVM.status = !citizenVM.status ;
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
