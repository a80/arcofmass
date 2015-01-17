if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
	Meteor.subscribe("adminHomeIssues");
	Meteor.subscribe("adminHomeActions");
	
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


	/*if (Meteor.isClient) {
	  // counter starts at 0
	  Session.setDefault("counter", 0);

	  Template.hello.helpers({
		counter: function () {
		  return Session.get("counter");
		}
	  });

	  Template.hello.events({
		'click button': function () {
		  // increment the counter when button is clicked
		  Session.set("counter", Session.get("counter") + 1);
		}
	  });
	}

	if (Meteor.isServer) {
	  Meteor.startup(function () {
		// code to run on server at startup
	  });
	}*/
}
else {
    //$('body').html('<div class="error">You must be logged in as an admin to use this application!</div>');
    throw new Meteor.Error(403, 'Permission denied');
}
