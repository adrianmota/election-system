const express = require("express");
const { engine } = require("express-handlebars");
const sequelize = require("./context/appContext");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const errorController = require("./controllers/errorController");

//Routes
const citizenRoute = require("./routes/citizen");
const electivePositionRoute = require("./routes/electivePosition");
const politicRoute = require("./routes/politic");
const candidateRoute = require("./routes/candidate");
const homeRoute = require("./routes/home");

//Models
const citizen = require("./models/citizen");
const electivePosition = require("./models/electivePosition");
const politic = require("./models/politic");
const candidate = require("./models/candidate");

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

// View Engine Config
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "mainLayout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

// Middlewares
app.use(homeRoute);
app.use("/admin", citizenRoute);
app.use("/admin", politicRoute);
app.use("/admin", electivePositionRoute);
app.use("/admin", candidateRoute);
app.use("/", errorController.get404);

// Relationships
candidate.belongsTo(politic, { constraint: true, onDelete: "RESTRICT" });
politic.hasMany(candidate);

candidate.belongsTo(electivePosition, {
  constraint: true,
  onDelete: "RESTRICT",
});
electivePosition.hasMany(candidate);

sequelize
  .sync(/* { force: true } */)
  .then((result) =>
    app.listen(port, hostname, () =>
      console.log(`App running at http://${hostname}:${port}/`)
    )
  )
  .catch((err) => console.error(err));