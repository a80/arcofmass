if (Roles.userIsInRole(Meteor.user(), ['admin']) {
	var selectedUserIssue = "none"; 

	Template.adminUpdate.helpers({
	  getUserIssues: function() {
		//Meteor.call("getUserIssues");
		//var userIssues =  
		//console.log("function entered: " + userIssues); 
		console.log(issues.find({}).fetch());
		return issues.find({}); 
		//return ["first issue", "second issue", "third issue"]; 
	  }, 
	  returnIssueName: function() {
		return this.name;
	  },
	  returnSelectedIssue: function() {
		//return 
	  },
	});
}
else {
    $('body').html('<div class="error">You must be logged in to use this application!</div>');
}
