/*Meteor.publish("userHomeIssues", function() {
	return issues.find({name: {$in: Meteor.users.find({_id: this.userId}).profile.issues}});
});*/
Meteor.publish("userHomeActions", function() {
	var todos = [];
	//this should loop through all of the users issues
	for (item in issues.find({name: {$in: Meteor.users.find({_id: this.userId}).profile.issues}})) {
		//this should add all of the action items that correspond to each issue
		todos.push(actionItems.find({name: {$in: item.actionItems}}));
	}
	return todos;
});

Meteor.publish("userNotifications", function() {
	return notifications.find({});
});

Meteor.publish("allUsers", function() {
	return Meteor.users.find();
});

Meteor.publish("getUserInspirations", function() {
	return inspirations.find({userId: this.userId}); 
});

Meteor.publish("getHelpedLinks", function() {
	return helped.find({userId: this.userId}); 
}); 

