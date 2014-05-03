
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

// db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/photodb');

// models
/*
var user = require('./models/user').User;
var photo = require('./model/photo').Photo;
var critique = require('./model/critique').Critique;
var group = require('./model/group').Group;
*/

// route files
var user = require('./routes/user');
/*
var photo = require('./routes/photo');
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

/*
app.get('/api/user/all', function(req, res) {
	User.find({}, function(err, result) {
		if(err) {
			throw err;
		}
		else {
			res.send(result);
		}
	});
});
*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
