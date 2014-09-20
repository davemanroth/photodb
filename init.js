
/**
 * Module dependencies.
 */

var express = require('express');
var MongoStore = require('connect-mongo')(express);
var routes = require('./backend/routes');
var http = require('http');
var path = require('path');

// db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/photodb');

// route files
var photo = require('./backend/routes/photo');
var user = require('./backend/routes/user');
/*
var group = require('./backend/routes/group');
var critique = require('./backend/routes/critique');
*/
/*
var group = require('./routes/group');
*/

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/frontend/views');
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
app.use(function (req, res, next) {
	res.locals.session = req.session;
	next();
});

app.use(express.static(path.join(__dirname, '/frontend/public')));

// Must go after static paths declared
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
app.get('/', routes.index);
app.get('/test1/test2', routes.index);
app.get('/partials/:name', routes.partials);


// Photos
app.get('/api/addphoto', photo.categories);
app.post('/api/addphoto', photo.photoSubmit);
app.put('/api/editphoto', photo.photoEdit);
app.get('/api/photos_all', photo.photosAll);
app.get('/api/photos/:id', photo.photoDetail);
app.get('/api/categories', photo.categories);

// Critiques
app.post('/api/critiques/add', critique.feedbackSubmit);

// User
app.get('/api/users/:username', user.profile);
app.post('/api/users/signup', user.signupAction);
/*
app.post('/api/login', user.login);
app.get('/api/logout', user.logout);
app.get('/api/signup', user.signupForm);
//app.get('/users', user.allUsers);

// Groups
app.get('/groups', group.listGroups);
app.post('/groups/add', group.addGroup);
app.get('/groups/addMembers', group.addMembersForm);

// Photos
app.get('/addphoto', photo.photoForm);
app.post('/addphoto', photo.photoSubmit);
app.get('/photos', photo.allPhotos);
app.get('/photos/:photoid', photo.photoDetail);

// Critiques
app.post('/critique/add', critique.feedbackSubmit);
*/
app.get('*', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
