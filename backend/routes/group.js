/**
 * User router
 */
var Group = require('../models/group').Group;
var User = require('../models/user').User;
var Photo = require('../models/photo').Photo;

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
	//First find the correct group
	Group.find({sef_name : sefname})
		.populate('created_by', 'username')
		.populate('members', 'username')
		.exec(function (err, group) {
		if(!err) {
			group = group[0];
			var ids = [];
			for(var i = 0; i < group.members.length; i++) {
				ids.push(group.members[i]._id);
			}
			//Next, aggregate all photos from members of group
			Photo.find({ author : {$in : ids } })
				.populate('author', 'username')
				.exec( function (err, photos) {
					if (err) {
						console.log(err);
					}
					else {
						res.json({ group: group, photos: photos });
					}
				});//Photo.find
		}
		else {
			console.log(err);
		}
	});//Group.find
}

exports.approveDeny = function (req, res) {
				/*
	console.log(req.body);
				*/

	if (req.body.approved) {
		Group.find({ sef_name : req.body.group }, 'members',
			function (err, group) {
				if (err) {
					console.log(err);
				}
				else {
					group = group[0];
					User.find({ username : req.body.requester }, 
						function (err, user) {
							if(err) {
								console.log(err);
							}
							else {
								user = user[0];
								group.members.push(user._id);
								group.save( function (err, savedGroup) {
									if (err) {
										console.log(err);
									}
									else {
										User.addToArray('groups', user.username, group._id);
										res.send('200');
									}
								});//Save group
							}
						});//Add requester to group
				}
			});//Find group to add user to
	}

// Delete message from group creator's profile page
	User.findById(req.user._id, 'messages',
		function (err, user) {
			if (err) {
				console.log(err);
			}
			else {
				user.messages.pull({_id : req.body.mssgid});
				user.save( function (err, savedUser) {
					if (err) {
						console.log(err);
					}
					else {
						console.log('Message successfully deleted');
					}
				});//user.save
			}
		});//findById
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

