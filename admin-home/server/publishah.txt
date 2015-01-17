Meteor.publish("adminHomeData", function() {
	return issues.find({});
});