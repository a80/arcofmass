Meteor.publish("userSettingsData", function() {
	return issues.find({});
});