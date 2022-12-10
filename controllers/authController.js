const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.GetLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    module: "Login",
  });
};

exports.PostLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render("auth/login", {
      pageTitle: "Login",
      module: "Login",
      hasError: true,
      errorMessage: "Todos los campos son obligatorios.",
    });
    return;
  }

  User.findOne({ where: { username: username } })
    .then((user) => {
      if (!user) {
        res.render("auth/login", {
          pageTitle: "Login",
          module: "Login",
          hasError: true,
          errorMessage: "El usuario con el que intenta acceder no existe.",
        });
        return;
      }

      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }

          res.render("auth/login", {
            pageTitle: "Login",
            module: "Login",
            hasError: true,
            errorMessage: "La contraseña es incorrecta.",
          });
          return;
        })
        .catch((err) => {
          console.log(err);

          res.render("auth/login", {
            pageTitle: "Login",
            module: "Login",
            hasError: true,
            errorMessage: "Ha ocurrido un error intentando iniciar sesion.",
          });
          return;
        });
    })
    .catch((err) => {
      console.log(err);
      res.render("auth/login", {
        pageTitle: "Login",
        module: "Login",
        hasError: true,
        errorMessage: "Ha ocurrido un error intentando iniciar sesion.",
      });
      return;
    });
};

exports.Logout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
