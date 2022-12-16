module.exports = (req, res, next) => {
  if (!req.session.isCitizenLoggedIn) {
    return res.render("home/index", {
      title: "Home",
      hasError: true,
      errorMessage: "No tienes permitido entrar en este apartado",
    });
  }
  next();
};