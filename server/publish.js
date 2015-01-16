Meteor.publish('userIssues', function() {
	return issues.find();
});
Meteor.publish('legislatorsColl', function() {
	return legislators.find();
});
Meteor.publish('actionsColl', function() {
	return actionItems.find();
});