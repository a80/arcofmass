actionItems = new Meteor.Collection("actionItems");
legislators = new Meteor.Collection("legislators");
issues = new Meteor.Collection("issues"); //redefined in profile-home.js

/*Meteor.publish("userIssues", function() {
	return Meteor.users.find({username: this.username}, {fields: {'issues': ["first", "second"]}});
});*/

