var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public/dist/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
var bcrypt = require('bcryptjs')
var uniqueValidator = require('mongoose-unique-validator')
// var assert = require('assert')
app.use(express.static(path.join(__dirname, './static')));
var session = require('express-session');
app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 36000 }
}));

require('./server/routes')(app);

app.listen(8000, function () {
    console.log("listening on port 8000");
});