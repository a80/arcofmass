Template.adminHome.helpers({
	getUserIssues: function() {
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
