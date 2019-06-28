// NPM PACKAGES
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/passport')

// SETTING THE PORT
var PORT = process.env.PORT || 4000;

// IMPORT MODELS FOLDER
var db = require("./models")

// CREATING EXPRESS APP
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

// SESSIONS 
app.use(session({
    secret: "secret garden",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

// LISTENER
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    })
})