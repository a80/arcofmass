//<<<<<<< HEAD
Template.adminHome.helpers({
	getUserIssues: function() {
/*=======
if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
	Meteor.subscribe("adminHomeIssues");
	Meteor.subscribe("adminHomeActions");
	
	Template.adminHome.helpers({
	  getUserIssues: function() {
>>>>>>> 2c343a9573a36d97e0b1269cd795c61c0276640b*/
		//Meteor.call("getUserIssues");
		//var userIssues =  
		//console.log("function entered: " + userIssues); 
		console.log(issues.find({}).fetch());
		return issues.find({}); 
		//return ["first issue", "second issue", "third issue"]; 
	}
});

Template.adminIssuePanel.helpers({
	returnIssueName: function() {
		return this.name;
	}, 
	returnIssueCount: function() {
		return this.count; 
	}
});


Template.adminHome.events({
	"click .btn": function(event) {
		Router.go("/update"); 
	}
});
