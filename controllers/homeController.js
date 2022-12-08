exports.getIndex = (req, res, next) => {
  res.render("home/index", {
    title: "Home",
    message: "Bienvenido a la sección del administrador",
  });
};