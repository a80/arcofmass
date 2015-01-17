Meteor.publish("adminUpdateData", function() {
	return issues.find({});
});