if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
	Meteor.publish("adminUpdateIssues", function() {
		return issues.find({});
	});
	Meteor.publish("adminUpdateActions", function() {
		return actionItems.find({});
	});
}