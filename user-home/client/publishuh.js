Meteor.publish("userHomeIssues", function() {
	return issues.find({name: {$in: Meteor.user.issues}});
});
Meteor.publish("userHomeActions", function() {
	var todos = [];
	//this should loop through all of the users issues
	for (item in issues.find({name: {$in: Meteor.user.issues}})) {
		//this should add all of the action items that correspond to each issue
		todos.push(actionItems.find({name: {$in: item.actionItems}));
	}
	return todos;
	//not sure if this will work but maybe.
});