actionItems = new Meteor.Collection("actionItems");
legislators = new Meteor.Collection("legislators");
issues = new Meteor.Collection("issues"); //redefined in profile-home.js

//Roles.createRole("admin");



//var id = Meteor.users.findOne({username: "eric"}); 

//Roles.addUsersToRoles(id, ['admin']);

//console.log("finished creation.");

/*Meteor.publish("userIssues", function() {
	return Meteor.users.find({username: this.username}, {fields: {'issues': ["first", "second"]}});
});*/

