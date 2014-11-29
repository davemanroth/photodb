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
			res.json({groups: groups});
		}
		else {
			console.log(err);
		}
	});
}

exports.listGroup = function (req, res) {
	var sefname = req.params.sefname;
	Group.find({sef_name : sefname})
		.populate('created_by', 'username')
		.populate('members', 'username')
		.exec(function (err, group) {
		if(!err) {
			res.json({group: group[0]});
		}
		else {
			console.log(err);
		}
	});
}

exports.requestJoin = function (req, res) {
	//console.log(req.body);
	User.findById(req.body.creator, 'messages', 
		function (err, user) {
			if (err) {
				console.log(err);
			}
			else {
				user.messages.push({
					from : req.body.requester,
					group : req.body.sef_group_name
				});
				user.save( function (err, savedUser) {
					if (err) {
						console.log(err);
					}
					else {
						console.log('Message saved!');
						res.json({ message : savedUser.messages.pop() });
					}
				});
			}
	});//User.findById
}

exports.addGroup = function (req, res) {
	/*
	*/
	var newGroup = new Group({
		name: req.body.name,
		sef_name: req.body.sef_name,
		created_by: req.user._id
	});
	newGroup.members.push(req.user._id);
	newGroup.save(function (err, group) {
		if (err) {
			console.log(err);
		}
		else {
			User.addToArray('groups', req.user.username, group._id);
			res.json(group);
		}
	});
}

