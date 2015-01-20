	Meteor.subscribe("adminUpdateIssues");
	Meteor.subscribe("adminUpdateActions");
	var selectedUserIssue = "none";
	
	Template.updateFormField.events({
		"click #saveLegislatorButton": function(event) {
			var legName = Template.instance.findAll("#nameInput").value;
			var legEmail = Template.instance.findAll("#emailInput").value;
			var legAddress = Template.instance.findAll("#addressInput").value;
			var dropdown = Template.instance.findAll("#dropdownMenu1");
			var issue = dropdown.options[dropdown.selectedIndex].text;
			console.log("submitted.");

			Meteor.call("addNewLegislator", legName, legEmail, legAddress, issue);
		},
		
		"click #saveTodoButton": function(event) {
			var name = Template.instance.findAll("#todoInput").value;
			var goal = Template.instance.findAll("#goalInput").value;
			var message = Template.instance.findAll("#messageInput").value;
			var dropdown = Template.instance.findAll("#dropdownMenu1");
			var issue = dropdown.options[dropdown.selectedIndex].text;
			var c = Template.instance.findAll("#checkInput");
			var important = false;
			if (c.checked) important = true;
			
			Meteor.call("addNewTodo", name, goal, message, issue, important);
		},
		"click #deleteTodoButton": function(event) {
			var name = Template.instance.findAll("#todoInput").value;
			Meteor.call("deleteTodo", name);
		},
		"click #deleteLegislatorButton": function(event) {
			var name = Template.instance.findAll("#nameInput").value;
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

	Template.adminUpdate.events({
		"click #admin-home-button": function(event) {
			Router.go("/admin"); 
		},

		"click #region-button": function(event) {
			Router.go("/region"); 
		}
	});


/*if (Roles.userIsInRole(Meteor.user(), ['admin'])) {


}
else {
    //$('body').html('<div class="error">You must be logged in to use this application!</div>');
    throw new Meteor.Error(403, 'Permission denied');
}*/
