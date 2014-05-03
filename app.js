
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');

// db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/photodb');

// route files
var user = require('./routes/user');
var photo = require('./routes/photo');
/*
var critique = require('./routes/critique');
var group = require('./routes/group');
*/

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.user(express.cookieParser());
app.use(express.session({secret: 'inLf87hr43h&hreo29fLHEuwh200fdHlaqQ'}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
app.get('/', routes.index);
app.get('/users/all', user.listAll);
app.get('/users/:userid', user.listOne);
app.get('/signup', user.createForm);
app.post('/signup', user.createAction);

app.get('/addphoto', photo.photoAddForm);
app.post('/addphoto', photo.photoAddAction);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
