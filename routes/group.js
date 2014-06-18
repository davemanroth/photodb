/**
 * User router
 */
var Group = require('../models/group').Group;
var User = require('../models/user').User;
var fs = require('fs');

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

exports.addMembersForm = function (req, res) {
	res.render('partials/addMembersForm');
}
