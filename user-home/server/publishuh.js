Meteor.publish("userHomeIssues", function() {
	console.log("RIGHT HERE"); 
	return issues.find({name: {$in: Meteor.user().profile.issues}});
});
Meteor.publish("userHomeActions", function() {
	var todos = [];
	//this should loop through all of the users issues
	for (item in issues.find({name: {$in: Meteor.user().profile.issues}})) {
		//this should add all of the action items that correspond to each issue
		todos.push(actionItems.find({name: {$in: item.actionItems}}));
	}
	return todos;
});

Meteor.publish("userNotifications", function() {
	console.log(notifications.find({}).fetch());
	//console.log("RIGHT HERE"); 
	return notifications.find({});
});