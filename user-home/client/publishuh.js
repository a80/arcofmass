Meteor.publish("userHomeData", function() {
	return issues.find({});
});