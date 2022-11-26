const express = require('express');
const { engine } = require('express-handlebars');
const errorController = require('./controllers/errorController');

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

app.listen(port, hostname, () => console.log(`http://${hostname}:${port}/`));