if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
	Meteor.subscribe("adminUpdateIssues");
	Meteor.subscribe("adminUpdateActions");
	var selectedUserIssue = "none";
	
	Template.updateFormField.events({
		"click #saveLegislatorButton": function(event) {
			var legName = document.getElementById("nameInput").value;
			var legEmail = document.getElementById("emailInput").value;
			var legAddress = document.getElementById("addressInput").value;
			var dropdown = document.getElementById("dropdownMenu1");
			var issue = dropdown.options[dropdown.selectedIndex].text;
			console.log("submitted.");

			Meteor.call("addNewLegislator", legName, legEmail, legAddress, issue);
		},
		
		"click #saveTodoButton": function(event) {
			var name = document.getElementById("todoInput").value;
			var goal = document.getElementById("goalInput").value;
			var message = document.getElementById("messageInput").value;
			var dropdown = document.getElementById("dropdownMenu1");
			var issue = dropdown.options[dropdown.selectedIndex].text;
			var c = document.getElementById("checkInput");
			var important = false;
			if (c.checked) important = true;
			
			Meteor.call("addNewTodo", name, goal, message, issue, important);
		},
		"click #deleteTodoButton": function(event) {
			var name = document.getElementById("todoInput").value;
			Meteor.call("deleteTodo", name);
		},
		"click #deleteLegislatorButton": function(event) {
			var name = document.getElementById("nameInput").value;
			Meteor.call("deleteLegislator", name);
		},
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
