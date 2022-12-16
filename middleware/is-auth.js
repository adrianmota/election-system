module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {        
    res.render("home/index", {
      title: "Home",
      hasError: true,
      errorMessage: "No tienes permitdo entrar en este apartado"
    });    
  }  
  next();
};
