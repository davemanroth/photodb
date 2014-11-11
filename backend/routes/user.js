/**
 * User router
 */
var User = require('../models/user').User;
var Group = require('../models/group').Group;
var Category = require('../models/category').Category;
var Filters = require('../models/category').Filters;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var gm = require('gm').subClass({ imageMagick: true });;
var fs = require('fs');

// Strategy used by Passport
// Taken from jaredhanson's passport-local example on Github
passport.use( new LocalStrategy( function(username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, { message: 'Unknown user ' + username });
		}
		user.comparePassword( password, function (err, isMatch) {
			if (err) {
				return done(err);
			}
			if (isMatch) {
				return done(null, user);
			}
			else {
				return done(null, false, { message: 'Invalid password' });
			}
		});//comparePassword
	});//findOne
}));//passport.use, LocalStrategy

passport.serializeUser( function (user, done) {
	done(null, user._id);
});

passport.deserializeUser( function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

exports.login = function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			req.session.messages = [info.message];
			res.send(401);
		}
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			res.send(req.user);
			//res.send(200);
		});
	})(req, res, next);
}

exports.logout = function (req, res) {
	req.logout();
	res.send('200');
}

exports.checkLoggedin = function (req, res) {
	res.send(req.isAuthenticated() ? req.user : '0');
}


/*
exports.login = function (req, res) {
	//console.log(req.body.username);
	User.find({
		username: req.body.username,
		password: req.body.password
	}, function (err, data) {
		if (!err) {
			if (data != '') {
				req.session.username = data[0].username;
				req.session.userid = data[0]._id;
			}
			res.json(data);
		}
		else {
			console.log('Error: ' + err);
		}
	});
}

exports.logout = function (req, res) {
	delete req.session.username;
	delete req.session.userid;
	req.session.username, req.session.userid = undefined;
	console.log('Logout initiated');
	res.json(true);
}
*/

/*
exports.signupForm = function (req, res) {
	res.render('signup', {title: 'User signup'});
};
*/

exports.signupAction = function (req, res) {
	//console.log([req.files, req.body]);
	
	var newUser = new User({
		username: req.body.username,
		password: req.body.password,
		join_date: Date.now(),
		email: req.body.email,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		bio: req.body.bio
	});

	if (req.files.pic !== undefined) {
		var pic = req.files.pic;
		var imgUrl = '/photo_uploads/profile_imgs/' + pic.name;
		var tmpPath = pic.path;
		var permPath = './frontend/public/' + imgUrl;
		newUser.self_portrait = imgUrl;

		fs.rename(tmpPath, permPath, function (err) {
			if (err) { next(err); console.log(err); }
			fs.unlink(tmpPath, function () {
				console.log('Image uploaded to ' + permPath);
			});
		});
	}

	newUser.save( function (err, user) {
		if(!err) {
			console.log('New user added!');
		}
		else {
			console.log(err);
		}
	});

	
	/*
	*/
}

/*
exports.allUsers = function (req, res) {
	User.find({}, function (err, users) {
		if(err) {
			console.log('Error: ' + err);
		}
		else {
			res.render('users', {users: users});
		}
	});
};
*/

/*
*/
exports.profile = function (req, res) {
	var username = req.params.username;
	User.find({username: username})
		  .populate('photos')
		  .populate('groups', 'name')
			.exec(function (err, user) {
		if(!err) {
			res.json({user: user[0], filters:Filters});
		}
		else {
			console.log(err);
		}
	});
}	
