Meteor.publish("adminUpdateIssues", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return issues.find({});
	}
});

Meteor.publish("adminUpdateActions", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return actionItems.find({});
	}
});

Meteor.publish("adminLegislatorRowArray", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return legislatorRowArray.find({});
	}
});

Meteor.publish("adminToDoRowArray", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return toDoRowArray.find({});
	}
});

Meteor.publish("adminSelectedIssue", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return selectedIssue.find({});
	}
});