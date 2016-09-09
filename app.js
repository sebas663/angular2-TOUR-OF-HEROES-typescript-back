// app.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');              // call express
var bodyParser = require('body-parser');          // body-parser
var multer     = require('multer');               // multer
var mongoose   = require('mongoose');             // mongoose
var cors = require('cors');

var app        = express();                       // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer());
// use it before all route definitions
app.use(cors({origin: 'http://localhost:3000'}));
// set our port
var port = process.env.PORT || 8080; 
       
// connect to our database
mongoose.connect('mongodb://localhost:27017/angular2-tour-of-heroes-back'); 


// REGISTER OUR ROUTES -------------------------------
var routes = require('./app/routes_controller');
//routes(app);   //routes shall use Express
// all of our routes will be prefixed with /api
app.use('/api', routes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);