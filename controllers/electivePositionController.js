const ElectivePosition = require("../models/electivePosition");

exports.getIndex = (req, res, next) => {
  ElectivePosition.findAll()
    .then((result) => {
      const electivePositions = result.map((result) => result.dataValues);
      res.render("electivePosition/index", {
        title: "Puestos Electivos",
        electivePositions,
        hasElectivePositions: electivePositions.length > 0,
        hasError: false,
        errorMessage: "",
      });
    })
    .catch((err) => console.error(err));
};

exports.postCreateElectivePosition = (req, res, next) => {
  let hasError = false;
  let errorMessage = "";

  const electivePosition = {
    name: req.body.name,
    description: req.body.description,
    state: true,
  };

  if (!electivePosition.name || !electivePosition.description) {
    hasError = true;
    errorMessage =
      "Debes rellenar todos los campos antes de enviar la información";
  }

  if (hasError) {
    ElectivePosition.findAll()
      .then((result) => {
        const electivePositions = result.map((result) => result.dataValues);
        res.render("electivePosition/index", {
          title: "Puestos Electivos",
          electivePositions,
          hasError,
          errorMessage,
        });
      })
      .catch((err) => console.error(err));
    return;
  }

  ElectivePosition.create(electivePosition)
    .then((result) => res.status(302).redirect("/admin/electivePositions"))
    .catch((err) => console.error(err));
};

exports.postEditElectivePosition = (req, res, next) => {
  let hasError = false;
  let errorMessage = "";
  
  const { id } = req.params;
  const electivePosition = {
    name: req.body.name,
    description: req.body.description,
    state: true,
  };

  if (!electivePosition.name || !electivePosition.description) {
    hasError = true;
    errorMessage =
      "Debes rellenar todos los campos antes de enviar la información";
  }

  if (hasError) {
    ElectivePosition.findAll()
      .then((result) => {
        const electivePositions = result.map((result) => result.dataValues);
        res.render("electivePosition/index", {
          title: "Puestos Electivos",
          electivePositions,
          hasError,
          errorMessage,
        });
      })
      .catch((err) => console.error(err));
    return;
  }

  ElectivePosition.update(electivePosition, {
    where: { id },
  })
    .then((result) => res.status(302).redirect("/admin/electivePositions"))
    .catch((err) => console.error(err));
};

exports.postChangeElectivePositionStatus = (req, res, next) => {
  const { id } = req.params;

  ElectivePosition.findOne({ where: { id } }).then((result) => {
    const electivePosition = result.dataValues;

    electivePosition.status = !electivePosition.status;
    ElectivePosition.update(
      {
        name: electivePosition.name,
        description: electivePosition.description,
        status: electivePosition.status,
      },
      { where: { id } }
    )
      .then((result) => res.status(302).redirect("/admin/electivePositions"))
      .catch((err) => console.error(err));
  });
};
