Meteor.publish("adminHomeIssues", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return issues.find({});
	}
});
Meteor.publish("adminHomeActions", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return actionItems.find({});
	}
});

Meteor.publish("adminHomeAllUsers", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return Meteor.users.find();
	}
});
