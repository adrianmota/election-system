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

  const { Name, Description } = req.body;
  const politic = { name: Name, description: Description, logoImg: "" };
  const imageFile = req.file;

  if (!Name || !Description || !imageFile) {
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

  const { Name, Description } = req.body;
  const { id } = req.params;
  const politic = { id, name: Name, description: Description, logoImg: "" };
  const imageFile = req.file;

  if (!Name || !Description) {
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
