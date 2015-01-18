if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
	Meteor.subscribe("adminUpdateIssues");
	Meteor.subscribe("adminUpdateActions");
	var selectedUserIssue = "none";
	
	Template.updateFormField.events({
		"click #addLegislator": function(event) {
			var legName = document.getElementById("nameInput").value;
			var legEmail = document.getElementById("emailInput").value;
			var legAddress = document.getElementById("addressInput").value;
			var dropdown = document.getElementById("dropdownMenu1");
			var issue = dropdown.options[dropdown.selectedIndex].text;
			console.log("submitted.");

			Meteor.call("addNewLegislator", legName, legEmail, legAddress, issue);
		}
		
		"click #addToDo": function(event) {
			
		}
	});


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
    //$('body').html('<div class="error">You must be logged in to use this application!</div>');
    throw new Meteor.Error(403, 'Permission denied');
}
