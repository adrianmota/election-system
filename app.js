const express = require("express");
const { engine } = require("express-handlebars");
const sequelize = require("./context/appContext");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");

const errorController = require("./controllers/errorController");

//Routes
const citizenRoute = require("./routes/citizen");
const electivePositionRoute = require("./routes/electivePosition");
const politicRoute = require("./routes/politic");
const candidateRoute = require("./routes/candidate");
const homeRoute = require("./routes/home");
const authRoute = require("./routes/auth");
const electionRoute = require("./routes/elections");
const voteRoute = require("./routes/vote");

//Models
const citizen = require("./models/citizen");
const electivePosition = require("./models/electivePosition");
const politic = require("./models/politic");
const candidate = require("./models/candidate");
const user = require("./models/user");
const election = require("./models/election");
const vote = require("./models/vote");
const resultElection = require("./models/resultElection");

//Seed
const userDefault = require("./seed/userDefault");

const hostname = "127.0.0.1";
const port = 5000;

const app = express();

app.use("/img", express.static(path.join(__dirname, "img")));

app.use(express.urlencoded({ extended: false }));

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img/politics");
  },
  filename: (req, file, cb) => {
    const filenameSpplited = file.originalname.split(".");
    const extname = filenameSpplited[filenameSpplited.length - 1];
    cb(null, `${uuidv4()}.${extname}`);
  },
});

app.use(multer({ storage: imageStorage }).single("logoImg"));

//utils

const IsEqualFunction = require("./utils/helpers/compare");

// View Engine Config
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "mainLayout",
    extname: "hbs",
    helpers:{
      compare : IsEqualFunction.EqualValue,
    }
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

// Middlewares
app.use(
  session({ secret: "HJIIIHVVHVHIUG", resave: true, saveUninitialized: false })
);

app.use((req, res, next) => {
  if (!req.session) {
    return next();
  }
  if (!req.session.user) {
    return next();
  }
  user
    .findByPk(req.session.user.id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  if (!req.session) {
    return next();
  }
  if (!req.session.citizen) {
    return next();
  }
  citizen
    .findByPk(req.session.citizen.id)
    .then((citizen) => {
      req.citizen = citizen;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.isCitizenLogged = req.session.isCitizenLoggedIn;
  next();
});

app.use(homeRoute);
app.use("/vote", voteRoute);
app.use("/admin", citizenRoute);
app.use("/admin", politicRoute);
app.use("/admin", electivePositionRoute);
app.use("/admin", candidateRoute);
app.use("/admin", electionRoute);
app.use(authRoute);
app.use("/", errorController.get404);

// Relations
candidate.belongsTo(politic, { constraint: true, onDelete: "RESTRICT" });
politic.hasMany(candidate);

candidate.belongsTo(electivePosition, {
  constraint: true,
  onDelete: "RESTRICT",
});
electivePosition.hasMany(candidate);

vote.belongsTo(citizen, { constraint: true, onDelete: "RESTRICT" });
citizen.hasMany(vote);

vote.belongsTo(candidate, { constraint: true, onDelete: "RESTRICT" });
candidate.hasMany(vote);

vote.belongsTo(politic, { constraint: true, onDelete: "RESTRICT" });
politic.hasMany(vote);

vote.belongsTo(electivePosition, { constraint: true, onDelete: "RESTRICT" });
electivePosition.hasMany(vote);

vote.belongsTo(election, { constraint: true, onDelete: "RESTRICT" });
election.hasMany(vote);

resultElection.belongsTo(election, { constraint: true, onDelete: "RESTRICT" });
election.hasMany(resultElection);

resultElection.belongsTo(election, { constraint: true, onDelete: "RESTRICT" });
election.hasMany(resultElection);

resultElection.belongsTo(candidate, { constraint: true, onDelete: "RESTRICT" });
candidate.hasMany(resultElection);

resultElection.belongsTo(politic, { constraint: true, onDelete: "RESTRICT" });
politic.hasMany(resultElection);

resultElection.belongsTo(electivePosition, { constraint: true, onDelete: "RESTRICT" });
electivePosition.hasMany(resultElection);

userDefault.createUser();

sequelize
  .sync(/*{ force: true }*/)
  .then((result) => {
    app.listen(port, hostname, () =>
      console.log(`App running at http://${hostname}:${port}/`)
    );
  })
  .catch((err) => console.error(err));