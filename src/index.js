const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const methodOverride = require('method-override')
const session = require('express-session');

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
}));

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


const route = require('./routes');
const db = require('./config/db');
//connect to db
db.connect();

app.use(express.static(path.join(__dirname, './resources/public')));

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(express.urlencoded());
app.use(express.json());

//HTTP logger
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a,b) => a+b,
            temp: [],
            saveValue: function(value, options) {
                this.savedValue = value;
            },
            getSavedValue: function(options) {
                return this.savedValue;
            }
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app); // Page route

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});