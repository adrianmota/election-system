module.exports = (req, res, next) => {
  if (req.session.isCitizenLoggedIn) {
    return res.redirect("/vote")
  }
  next();
};
