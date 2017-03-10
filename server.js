// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session  = require('express-session');
var mongoose = require('mongoose');
var database = require('./config/database');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 8000;

var passport = require('passport');
var flash    = require('connect-flash');

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration

//Makes connection asynchronously.  Mongoose will queue up database
//operations and release them when the connection is complete.
mongoose.connect(database.localUrl, function (err, res) {
if (err) {
console.log ('ERROR connecting to: ' + database.localUrl + '. ' + err);
} else {
console.log ('Succeeded connected to: ' + database.localUrl);
}
});

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // set up ejs for templating

//angularjs
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({
	secret: 'teststring',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//development only
//if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
//}
// launch ======================================================================
app.listen(port);
console.log('The port ' + port);
