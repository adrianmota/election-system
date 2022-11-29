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
        res.render("admin/index", {
          title: "Partidos",
          politics,
          hasError,
          errorMessage,
        });
      })
      .catch((err) => console.error(err));
    return;
  }

  politic.logoImg = imageFile.path;
  Politic.create(politic)
    .then((result) => {
      console.log(result);
      res.status(302).redirect("/politics");
    })
    .catch((err) => console.error(err));
};

exports.postEditPolitic = (req, res, next) => {
  let hasError = false;
  let errorMessage = "";

  const { Id, Name, Description } = req.body;
  const politic = { id: Id, name: Name, description: Description, logoImg: "" };
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
        res.render("admin/index", {
          title: "Partidos",
          politics,
          hasError,
          errorMessage,
        });
      })
      .catch((err) => console.error(err));
    return;
  }

  Politic.findOne({ where: { Id } })
    .then((result) => {
      const oldPolitic = result.dataValues;
      politic.logoImg = !imageFile ? oldPolitic.logoImg : imageFile.path;
      Politic.update(
        {
          name: politic.name,
          description: politic.description,
          logoImg: politic.logoImg,
        },
        { where: { Id } }
      )
        .then((result) => res.status(302).redirect("/politics"))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

exports.postDeletePolitic = (req, res, next) => {
  const { Id } = req.body;

  Politic.findOne({ where: { Id } })
    .then((result) => {
      const politic = result.dataValues;
      politic.status = false;
      Politic.update(
        {
          name: politic.name,
          description: politic.description,
          logoImg: politic.logoImg,
          status: politic.status,
        },
        { where: { Id } }
      )
        .then((result) => res.status(302).redirect("/politics"))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};