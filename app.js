const express = require('express');
const { engine } = require('express-handlebars');
const sequelize = require('./context/appContext');
const errorController = require('./controllers/errorController');

//Models
const citizen = require('./models/citizen');
const electivePosition = require('./models/electivePosition');
const politic = require('./models/politic');

const hostname = '127.0.0.1';
const port = 5000;

const app = express();

// View Engine Config
app.engine('hbs', engine({
    layoutsDir: 'views/layouts',
    defaultLayout: 'mainLayout',
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', 'views');

// Middlewares
app.use('/', errorController.get404);

sequelize.sync()
    .then(result => app.listen(port, hostname, () => console.log(`http://${hostname}:${port}/`)))
    .catch(err => console.error(err));