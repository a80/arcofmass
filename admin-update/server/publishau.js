Meteor.publish("adminUpdateIssues", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return issues.find({});
	}
});
Meteor.publish("adminUpdateActions", function() 
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return actionItems.find({});
	}
});
