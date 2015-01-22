	Meteor.subscribe("adminUpdateIssues");
	Meteor.subscribe("adminUpdateActions");
	Meteor.subscribe("adminLegislatorRowArray"); 
	Meteor.subscribe("adminToDoRowArray"); 
	

	//var selectedUserIssue = "none";
	//var issue = null; 
	//var legislatorRowArray = [];
	//var toDoRowArray = []; 
	
	Template.adminUpdate.events({
		"click #logoutButton": function(event) {
			Meteor.logout();
		},
		"click #logoutButton": function(event) {
			Accounts.logout();
		},
		"click #addIssueButton": function(event) {
			var newIssue = document.getElementById("addIssueField").value;
			if (Meteor.call("cleanInput", newIssue) != false) {
				newIssue = Meteor.call("cleanInput", newIssue);
				Meteor.call("addNewIssue", newIssue);
			}
			else {
				alert("There was a problem with the input");
			}
		},
		"click #deleteIssueButton": function(event) {
			var delIssue = $document.find(".active").value;
			if (Meteor.call("cleanInput", delIssue) != false) {
				newIssue = Meteor.call("cleanInput", delIssue);
				Meteor.call("delIssue", delIssue);
			}
			else {
				alert("There was a problem with the input");
			}
		},

		"click .list-group-item": function(event, template){
			//event.target.addClass("active");

			if (template.find(".active") === null) {
				$(event.target).addClass('active');
				//event.target.addClass("active");
			} else {
				/*console.log("entering the else"); 
				previous = template.find(".active");
				console.log(previous); 
				console.log("here"); 
				template.find(".active").removeClass('active'); */

				//console.log(template.find(".active").classList);

				template.find(".active").classList.remove("active"); 
				$(event.target).addClass('active');
			}

		/*"click .list-group-item": function(event){
			
			previous.removeClass('active');
			$(event.target).addClass('active'); */
			
			
			selectedIssueInList = $(".active").text();
			//selectedIssueInList = template.find(".active").text();

			Meteor.call("adminUpdateSelectIssue", selectedIssueInList); 

			//console.log("clicked"); 


			//TODO!
		}
	});


	
	Template.updateFormField.events({
		"click #saveLegislatorButton": function(event) {

			//
			var legName = Template.instance().find("#nameInput").value;	
			var legEmail = Template.instance().find("#emailInput").value;
			var legAddress = Template.instance().find("#addressInput").value;
			
			var dropdown = document.getElementById("dropdownMenu1");

			//console.log(dropdown);
			//var issue = dropdown.options[dropdown.selectedIndex].text;
			//console.log("I have clicked the savelegislator button. submitted.");
			var issue = $(".active").text; 
			//console.log("got here");
			//console.log(issue); 
			if (Meteor.call("cleanInput", legName) != false && Meteor.call("cleanInput", letEmail) != false && Meteor.call("cleanInput", legAddress) != false && Meteor.call("cleanInput", issue) != false) {
				legName = Meteor.call("cleanInput", legName);
				legEmail = Meteor.call("cleanInput", legEmail);
				var atpos = legEmail.indexOf("@");
				var dotpos = legEmail.lastIndexOf(".");
				if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=legEmail.length) {
					alert("Not a valid e-mail address");
				} else {
					legAddress = Meteor.call("cleanInput", legAddress);
					issue = Meteor.call("cleanInput", legAddress);
					Meteor.call("addNewLegislator", legName, legEmail, legAddress, issue);
				}
			}
			else {
				alert("There was a problem with the input");
			}
		},
		
		"click #saveTodoButton": function(event) {
			var name = Template.instance().find("#todoInput").value;
			var goal = Template.instance().find("#goalInput").value;
			var message = Template.instance().find("#messageInput").value;
			//var dropdown = Template.instance().find("#dropdownMenu1");
			//var issue = dropdown.options[dropdown.selectedIndex].text;
			var c = Template.instance().find("#checkInput");
			
			var important = false;
			if (c.checked) important = true;

			//var issue = $(".active").text;

			var issue = $(".active").text;
			if (Meteor.call("cleanInput", name) != false && Meteor.call("cleanInput", goal) != false && Meteor.call("cleanInput", message) != false) {
				name = Meteor.call("cleanInput", name);
				goal = Meteor.call("cleanInput", goal);
				if (goal === parseInt(goal, 10)) {
					message = Metor.call("cleanInput", message);
					Meteor.call("addNewTodo", name, goal, message, issue, important);
				}
				else {
					alert("Goal must be an int");
				}
			}
			else {
				alert("There was a problem with the input");
			}
			
		},
		"click #deleteTodoButton": function(event) {
			var name = Template.instance().find("#todoInput").value;
			Meteor.call("deleteTodo", name);
		},
		"click #deleteLegislatorButton": function(event) {
			//console.log(Template.instance);
			var name = Template.instance().find("#nameInput").value;
			if (Meteor.call("cleanInput", name) != false) {
				name = Meteor.call("cleanInput", name);
				Meteor.call("deleteLegislator", name);
			}
			else {
				alert("There was a problem with the input");
			}
		},
	});

	Template.updateFormField.helpers({
	    getLegislatorInfo: function() {
	  	//return leg associated with the issue 
	  	//console.log("getLegInfo accessed, the issue is: " + issue);
	  	//console.log(legislators.find({issue: issue}).fetch()); 
	  		issueName = selectedIssue.findOne({name: "selectedIssueObject"}).selectedIssue; 
	  		return legislators.find({issue: issueName}); 
	    },

	    getToDoInfo: function() {
	  	//return todo associated with the issue 
	  	//var issueName = issue; 

	  		//console.log("getToDoInfo accessed, the issue is: " + issue);

	  		issueName = selectedIssue.findOne({name: "selectedIssueObject"}).selectedIssue; 

	  		var actionItemsForIssue = [];

			actionItemsData = actionItems.find({}).fetch();

			for (var i = 0; i < actionItemsData.length; i++) {
		  //console.log("entered if loop"); 
		  		if (actionItemsData[i].issue === issueName) {
				actionItemsForIssue.push(actionItemsData[i]); 
		  		}	
			}

		//need to map according to a new layout schema
		/*_.map(actionItemsForIssue, function(a) {
      		_.extend(a, {toDoID: a._id}); });

      	_.map(actionItemsForIssue, function(a) {
      		_.extend(a, {toDoCheckID: a.message}); });*/ 

      		return actionItemsForIssue; 
	    },

	    getLegislatorRowArray: function() {
	    	return legislatorRowArray.findOne({name: "legislatorRowArrayObject"}).arrayList;
	    }, 



	    getToDoRowArray: function() {
	    	return toDoRowArray.findOne({name: "toDoRowArrayObject"}).arrayList; 
	    },

	    //delete button should be wired to decrementing the array. 

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
	  
	  

	  /*addToDo: function() {
	  		return toDoRow.instance();
	  },

	  addLegislator: function() {
	  		return legislatorRow.instance();
	  },*/

	  returnUserId: function() {
		return Meteor.user().username; 
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


Template.addLegButton.events({
	"click #addLegislatorRow": function(event) {
		Meteor.call("addLegislatorRowFunction");
		console.log("called in client - addLegRowFunction"); 
		//Router.go("/update");  
	},
});

Template.addToDoButton.events({
	"click #addToDoRow": function(event) {
		Meteor.call("addToDoRowFunction");
		console.log("called in client - addToDoRowFunction"); 
		//Router.go("/update");  
	},
});

Template.legislatorRow.events({
	"click #deleteLegislatorButton": function(event) {
		Meteor.call("deleteLegislatorRowFunction");
	},
}); 

Template.toDoRow.events({
	"click #deleteToDoButton": function(event) {
		Meteor.call("deleteToDoRowFunction");
	},
}); 


/*if (Roles.userIsInRole(Meteor.user(), ['admin'])) {


}
else {
    //$('body').html('<div class="error">You must be logged in to use this application!</div>');
    throw new Meteor.Error(403, 'Permission denied');
}*/
