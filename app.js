
/**
 * Module dependencies.
 */

var express = require('express');
var MongoStore = require('connect-mongo')(express);
var routes = require('./routes');
var http = require('http');
var path = require('path');

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
app.use(express.cookieParser('Ihfe33hlPIBDuhasdh923auhwuf'));
app.use(express.session({
	store: new MongoStore({
		db: 'photodb',
		host: '127.0.0.1',
		port: 27017
	})
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
app.get('/', routes.index);

// User
app.post('/login', user.login);
app.get('/logout', user.logout);
app.get('/signup', user.signupForm);
app.post('/signup', user.signupAction);
app.get('/users/:username', user.profile);
//app.get('/users', user.allUsers);

// Photos
app.get('/addphoto', photo.photoAddForm);
app.post('/addphoto', photo.photoAddAction);
app.get('/photos', photo.allPhotos);
app.get('/photos/:photoid', photo.photoDetail);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
