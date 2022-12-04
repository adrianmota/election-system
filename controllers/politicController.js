const Politic = require("../models/politic");

exports.getIndex = (req, res, next) => {
  Politic.findAll()
    .then((result) => {
      const politics = result.map((result) => result.dataValues);
      res.render("politic/index", {
        title: "Partidos",
        politics,
        hasPolitics: politics.length > 0,
        hasError: false,
      });
    })
    .catch((err) => console.error(err));
};

exports.postCreatePolitic = (req, res, next) => {
  let hasError = false;
  let errorMessage = "";

  const imageFile = req.file;
  const politic = {
    name: req.body.name,
    description: req.body.description,
    logoImg: "",
  };

  if (!politic.name || !politic.description || !imageFile) {
    hasError = true;
    errorMessage =
      "Debes rellenar todos los campos antes de enviar la información";
  }

  if (hasError) {
    Politic.findAll()
      .then((result) => {
        const politics = result.map((result) => result.dataValues);
        res.render("politic/index", {
          title: "Partidos",
          politics,
          hasError,
          errorMessage,
        });
      })
      .catch((err) => console.error(err));
    return;
  }

  politic.logoImg = `/${imageFile.path}`;
  Politic.create(politic)
    .then((result) => {
      console.log(result);
      res.status(302).redirect("/admin/politics");
    })
    .catch((err) => console.error(err));
};

exports.postEditPolitic = (req, res, next) => {
  let hasError = false;
  let errorMessage = "";

  const { id } = req.params;
  const imageFile = req.file;
  const politic = {
    name: req.body.name,
    description: req.body.description,
    logoImg: "",
  };

  if (!politic.name || !politic.description) {
    hasError = true;
    errorMessage =
      "Debes rellenar todos los campos antes de enviar la información";
  }

  if (hasError) {
    Politic.findAll()
      .then((result) => {
        const politics = result.map((result) => result.dataValues);
        res.render("politic/index", {
          title: "Partidos",
          politics,
          hasError,
          errorMessage,
        });
      })
      .catch((err) => console.error(err));
    return;
  }

  Politic.findOne({ where: { id } })
    .then((result) => {
      const oldPolitic = result.dataValues;
      politic.logoImg = !imageFile ? oldPolitic.logoImg : `/${imageFile.path}`;
      Politic.update(
        {
          name: politic.name,
          description: politic.description,
          logoImg: politic.logoImg,
        },
        { where: { id } }
      )
        .then((result) => res.status(302).redirect("/admin/politics"))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

exports.postChangePoliticStatus = (req, res, next) => {
  const { id } = req.params;

  Politic.findOne({ where: { id } })
    .then((result) => {
      const politic = result.dataValues;
      politic.status = !politic.status;
      Politic.update(
        {
          name: politic.name,
          description: politic.description,
          logoImg: politic.logoImg,
          status: politic.status,
        },
        { where: { id } }
      )
        .then((result) => res.status(302).redirect("/admin/politics"))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};
