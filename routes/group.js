/**
 * User router
 */
var Group = require('../models/group').Group;
var User = require('../models/user').User;

exports.listGroups = function (req, res) {
	Group.find()
		.populate('created_by', 'username')
		.exec(function (err, groups) {
		if(!err) {
			res.render('groups', {groups: groups});
		}
		else {
			console.log(err);
		}
	});
}

exports.addGroup = function (req, res) {
	var newGroup = new Group({
		name: req.body.group,
		created_by: req.session.userid,
	});
	newGroup.members.push(req.session.userid);
	newGroup.save(function (err, group) {
		if (err) {
			console.log(err);
		}
		else {
			User.addToArray('groups', req.session.username, group._id);
			console.log('new group added to user model');
		}
	});
}

exports.addMembersForm = function (req, res) {
	res.render('partials/addMembersForm');
}
