if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
	Meteor.publish("adminHomeIssues", function() {
		return issues.find({});
	});
	Meteor.publish("adminHomeActions", function() {
		return actionItems.find({});
	});
}