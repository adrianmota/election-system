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

//Models
const citizen = require("./models/citizen");
const electivePosition = require("./models/electivePosition");
const politic = require("./models/politic");

const hostname = "127.0.0.1";
const port = 5000;

const app = express();

app.use("/img", express.static(path.join(__dirname, "img")));

app.use(express.urlencoded({ extended: false }));


const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'img/politics');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

app.use(multer({ storage: imageStorage }).single("LogoImg"));

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
app.use("/admin", citizenRoute);
app.use("/admin", politicRoute);
app.use("/admin", electivePositionRoute);
app.use("/", errorController.get404);

sequelize
  .sync()
  .then((result) =>
    app.listen(port, hostname, () =>
      console.log(`App running at http://${hostname}:${port}/`)
    )
  )
  .catch((err) => console.error(err));
