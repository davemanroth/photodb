
/**
 * Module dependencies.
 */

var express = require('express');
var MongoStore = require('connect-mongo')(express);
var routes = require('./backend/routes');
var http = require('http');
var path = require('path');
var passport = require('passport');

// db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/photodb');

// route files
var photo = require('./backend/routes/photo');
var user = require('./backend/routes/user');
var critique = require('./backend/routes/critique');
var group = require('./backend/routes/group');
/*
*/

var auth = function (req, res, next) {
	if (!req.isAuthenticated()) {
		res.send(401);
	}
	else {
		next();
	}
}

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
app.use( express.session({ secret: 'keyboard cat'}) );
app.use(passport.initialize());
app.use(passport.session());
/*
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
*/
app.use(express.static(path.join(__dirname, '/frontend/public')));

// Must go after static paths declared
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
app.use( function (req, res, next) {
	res.locals.user = req.user;
	next();
});
*/

// routes
app.get('/', routes.index);
app.get('/test1/test2', routes.index);
app.get('/partials/:name', routes.partials);


// Photos
app.get('/api/addphoto', photo.photoSubmitSetup);
app.post('/api/addphoto', photo.photoSubmitAction);
app.put('/api/editphoto', photo.photoEdit);
app.get('/api/photos_all', photo.photosAll);
app.get('/api/photos/:id', photo.photoDetail);
app.get('/api/categories', photo.categories);

// Critiques
app.post('/api/critiques/add', critique.feedbackSubmit);

// User
app.get('/api/users/checkLoggedin', user.checkLoggedin);
app.post('/api/users/signup', user.signupAction);
app.post('/api/users/authenticate', user.login);
app.post('/api/users/logout', user.logout);
app.get('/api/users/:username', auth, user.profile);

// Groups
app.get('/api/groups_all', group.listGroups);
app.get('/api/groups/:sefname', group.listGroup);
app.post('/api/groups/add', group.addGroup);
app.post('/api/groups/request', group.requestJoin);
app.post('/api/groups/approve-deny', group.approveDeny);

app.get('*', routes.index);
/*
app.get('*', function (req, res, next) {
	if (req.session.user !== undefined) {
		res.locals.user = req.session.user
	}
});
*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
