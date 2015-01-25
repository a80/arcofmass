Meteor.publish("userSettingsData", function() {
	return issues.find({});
});

// Meteor.publish("userNotifications", function() {
// 	return notifications.find();
// });