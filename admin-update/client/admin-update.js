	Meteor.subscribe("adminUpdateIssues");
	Meteor.subscribe("adminUpdateActions");
	//Meteor.subscribe("adminLegislatorRowArray"); 
	//Meteor.subscribe("adminToDoRowArray"); 
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
			Meteor.call("cleanInput", newIssue, function(error, newIssue) {
				if (newIssue != false) {
					Meteor.call("addNewIssue", newIssue);
				}
				else {
					alert("There was a problem with the input");
				}
			});
		},
		"click #deleteIssueButton": function(event, template) {
			//var delIssue = template.find(".active").value;
			var delIssue; 

			if (Session.get("adminSelectedIssue") != undefined) {
				delIssue = Session.get("adminSelectedIssue");
				Meteor.call("delIssue", delIssue);
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

			Session.set("adminSelectedIssue", selectedIssueInList); 
			//console.log(Session.get("adminSelectedIssue")); 

			//Meteor.call("adminUpdateSelectIssue", selectedIssueInList); 

			//console.log("clicked"); 


			//TODO!
		}
	});


	Template.legislatorRow.events({
		"click .saveLegislatorButton": function(event, template) {


			console.log(template.find(".nameInput").value); 


			var legName = template.find(".nameInput").value;	

			console.log(template.find(".emailInput").value); 
			var legEmail = template.find(".emailInput").value;
			var legAddress = template.find(".addressInput").value;
			
			//var dropdown = document.getElementById("dropdownMenu1");

			//console.log(dropdown);
			//var issue = dropdown.options[dropdown.selectedIndex].text;
			//console.log("I have clicked the savelegislator button. submitted.");
			//var issue = $(".active").text; 

			var issue = Session.get("adminSelectedIssue"); 
			console.log(issue); 
			//console.log("got here");
			//console.log(issue); 
			Meteor.call("cleanInput", legName, function(error, legName) {
				if (legName != false) {
					Meteor.call("cleanInput", legAddress, function(error, legAddress) {
						if (legAddress != false) {
							Meteor.call("cleanInput", legEmail, function(error, legEmail) {
								if (legEmail != false) {
									var atpos = legEmail.indexOf("@");
									var perpos = legEmail.indexOf(".");
									if (atpos< 1 || perpos<atpos+2 || perpos+2>=legEmail.length) {
										alert("Not a valid email address");
									} else {
										Meteor.call("cleanInput", issue, function(error, issue) {
											if (issue != false) {
												Meteor.call("addNewLegislator", legName, legEmail, legAddress, issue);
											} else {
												alert("There was a problem with your issue");
											}
										});
									}
								} else {
									alert("There was a problem with your email");
								}
							});
						} else {
							alert("There was a problem with your address");
						}
					});
				} else {
					alert("There was a problem with your name");
				}
			});
			
		},

		"click .deleteLegislatorButton": function(event, template) {
			//Meteor.call("deleteLegislatorRowFunction");
			var numberOfRows; 
			var name = template.find(".nameInput").value;
			console.log(name); 
			Meteor.call("deleteLegislator", name);
			
			if (Session.get("newLegislatorRowArray") != undefined) {
				if (Session.get("newLegislatorRowArray") === "1") {
					Session.set("newLegislatorRowArray", undefined);
				} else {
					numberOfRows = Session.get("newLegislatorRowArray"); 
					index = numberOfRows.length - 2; 
					Session.set("newLegislatorRowArray", numberOfRows.substring(0, index));
				}
			}
		},
	});



	Template.legislatorRowNew.events({
		"click #saveLegislatorButton": function(event, template) {


			console.log(template.find(".nameInput").value); 


			var legName = template.find(".nameInput").value;	

			console.log(template.find(".emailInput").value); 
			var legEmail = template.find(".emailInput").value;
			var legAddress = template.find(".addressInput").value;
			
			//var dropdown = document.getElementById("dropdownMenu1");

			//console.log(dropdown);
			//var issue = dropdown.options[dropdown.selectedIndex].text;
			//console.log("I have clicked the savelegislator button. submitted.");
			//var issue = $(".active").text; 

			var issue = Session.get("adminSelectedIssue"); 
			console.log(issue); 
			//console.log("got here");
			//console.log(issue); 
			Meteor.call("cleanInput", legName, function(error, legName) {
				if (legName != false) {
					Meteor.call("cleanInput", legAddress, function(error, legAddress) {
						if (legAddress != false) {
							Meteor.call("cleanInput", legEmail, function(error, legEmail) {
								if (legEmail != false) {
									var atpos = legEmail.indexOf("@");
									var perpos = legEmail.indexOf(".");
									if (atpos< 1 || perpos<atpos+2 || perpos+2>=legEmail.length) {
										alert("Not a valid email address");
									} else {
										Meteor.call("cleanInput", issue, function(error, issue) {
											if (issue != false) {
												Meteor.call("addNewLegislator", legName, legEmail, legAddress, issue);
											} else {
												alert("There was a problem with your issue");
											}
										});
									}
								} else {
									alert("There was a problem with your email");
								}
							});
						} else {
							alert("There was a problem with your address");
						}
					});
				} else {
					alert("There was a problem with your name");
				}
			});
			
		},
		
		/*"click #deleteLegislatorButton": function(event) {
			//console.log(Template.instance);
			var name = Template.instance.find("#nameInput").value;
			Meteor.call("deleteLegislator", name);
		},*/

		"click #deleteLegislatorButton": function(event) {
		//Meteor.call("deleteLegislatorRowFunction");
		var numberOfRows; 
	    
	    if (Session.get("newLegislatorRowArray") != undefined) {
	    	if (Session.get("newLegislatorRowArray") === "1") {
	    		Session.set("newLegislatorRowArray", undefined);
	    	} else {
	    		numberOfRows = Session.get("newLegislatorRowArray"); 
	    		index = numberOfRows.length - 2; 
				Session.set("newLegislatorRowArray", numberOfRows.substring(0, index));
	    	}
		}
	},
	});
	
	Template.toDoRow.events({
		"click .saveToDoButton": function(event, template) {
			console.log("ITS CALLEDAS");
			var name = template.find(".todoInput").value;
			var goal = template.find(".goalInput").value;
			console.log(goal); 
			var message = template.find(".messageInput").value;
			//var dropdown = Template.instance().find("#dropdownMenu1");
			//var issue = dropdown.options[dropdown.selectedIndex].text;
			var c = template.find(".checkInput");
			
			var important = false;
			if (c.checked) important = true;

			console.log(c.checked); 
			console.log(important); 

			//var issue = $(".active").text;

			//var issue = $(".active").text;

			var issue = Session.get("adminSelectedIssue"); 
			
			Meteor.call("cleanInput", name, function(error, name) {
				if (name != false) {
					Meteor.call("cleanInput", message, function(error, message) {
						if (message != false) {
							Meteor.call("cleanInput", goal, function(error, goal) {
								if (goal != false) {
									if (!isNaN(goal)) {
										Meteor.call("addNewTodo", name, goal, message, issue, important);
									} else {
										alert("Your goal must be an integer");
									}
								} else {
									alert("There was a problem with your goal");
								}
							});
						} else {
							alert("There was a problem with your message");
						}
					});
				} else {
					alert("There was a problem with your name");
				}
			});
			
		},
		/*"click #deleteTodoButton": function(event) {
			var name = Template.instance.find("#todoInput").value;
			Meteor.call("deleteTodo", name);
		},*/

		"click .deleteToDoButton": function(event, template) {
		//Meteor.call("deleteToDoRowFunction");
			var numberOfRows;
			var name = template.find(".todoInput").value;
			console.log("entered"); 
			console.log(name); 
			Meteor.call("deleteTodo", name);
			
			if (Session.get("newToDoRowArray") != undefined) {
				if (Session.get("newToDoRowArray") === "1") {
					Session.set("newToDoRowArray", undefined);
				} else {
					numberOfRows = Session.get("newToDoRowArray"); 
					index = numberOfRows.length - 2; 
					Session.set("newToDoRowArray", numberOfRows.substring(0, index));
				}
			}
		},

	});
	
	Template.toDoRowNew.events({
		"click #saveToDoButton": function(event, template) {
			console.log("ITS CALLEDAS");
			var name = template.find(".todoInput").value;
			var goal = template.find(".goalInput").value;
			console.log(goal); 
			var message = template.find(".messageInput").value;
			//var dropdown = Template.instance().find("#dropdownMenu1");
			//var issue = dropdown.options[dropdown.selectedIndex].text;
			var c = template.find(".checkInput");
			
			var important = false;
			if (c.checked) important = true;

			console.log(c.checked); 
			console.log(important); 

			//var issue = $(".active").text;

			//var issue = $(".active").text;

			var issue = Session.get("adminSelectedIssue"); 
			
			Meteor.call("cleanInput", name, function(error, name) {
				if (name != false) {
					Meteor.call("cleanInput", message, function(error, message) {
						if (message != false) {
							Meteor.call("cleanInput", goal, function(error, goal) {
								if (goal != false) {
									if (!isNaN(goal)) {
										Meteor.call("addNewTodo", name, goal, message, issue, important);
									} else {
										alert("Your goal must be an integer");
									}
								} else {
									alert("There was a problem with your goal");
								}
							});
						} else {
							alert("There was a problem with your message");
						}
					});
				} else {
					alert("There was a problem with your name");
				}
			});
			
		},
		/*"click #deleteTodoButton": function(event) {
			var name = Template.instance.find("#todoInput").value;
			Meteor.call("deleteTodo", name);
		},*/

		"click #deleteToDoButton": function(event) {
		//Meteor.call("deleteToDoRowFunction");
		var numberOfRows; 
	    
	    if (Session.get("newToDoRowArray") != undefined) {
	    	if (Session.get("newToDoRowArray") === "1") {
	    		Session.set("newToDoRowArray", undefined);
	    	} else {
	    		numberOfRows = Session.get("newToDoRowArray"); 
	    		index = numberOfRows.length - 2; 
				Session.set("newToDoRowArray", numberOfRows.substring(0, index));
	    	}
		}
	},

	});

	Template.updateFormField.helpers({
	    getLegislatorInfo: function() {
	  	//return leg associated with the issue 
	  	//console.log("getLegInfo accessed, the issue is: " + issue);
	  	//console.log(legislators.find({issue: issue}).fetch()); 
	  		//issueName = selectedIssue.findOne({name: "selectedIssueObject"}).selectedIssue; 

	  		var relevantLegislators; 

	  		issueName = Session.get("adminSelectedIssue"); 

	  		if (issueName != undefined) {
	  			relevantLegislators = legislators.find({issue: issueName}); 
	  		} else {
	  			relevantLegislators = []; 
	  		}

	  		return relevantLegislators; 
	    },

	    getToDoInfo: function() {
	  	//return todo associated with the issue 
	  	//var issueName = issue; 

	  		//console.log("getToDoInfo accessed, the issue is: " + issue);

	  		//issueName = selectedIssue.findOne({name: "selectedIssueObject"}).selectedIssue; 

	  		var actionItemsForIssue = [];
	  		issueName = Session.get("adminSelectedIssue"); 

	  		if (issueName != undefined) {
	  			actionItemsForIssue = actionItems.find({issue: issueName}); 
	  		} else {
	  			actionItemsForIssue = []; 
	  		}

	  		return actionItemsForIssue; 

			/*actionItemsData = actionItems.find({}).fetch();

			for (var i = 0; i < actionItemsData.length; i++) {
		  //console.log("entered if loop"); 
		  		if (actionItemsData[i].issue === issueName) {
				actionItemsForIssue.push(actionItemsData[i]); 
		  		}	
			}*/

		//need to map according to a new layout schema
		/*_.map(actionItemsForIssue, function(a) {
      		_.extend(a, {toDoID: a._id}); });

      	_.map(actionItemsForIssue, function(a) {
      		_.extend(a, {toDoCheckID: a.message}); });*/ 

      		return actionItemsForIssue; 
	    },

	    getLegislatorRowArray: function() {

	    	//return legislatorRowArray.findOne({name: "legislatorRowArrayObject"}).arrayList;

	    	//return legislatorRowArray.findOne({name: "legislatorRowArrayObject"}).arrayList;
	    	var numberOfRows; 
	    	if (Session.get("newLegislatorRowArray") === undefined) {
				numberOfRows = []; 
			} else {
				numberOfRows = Session.get("newLegislatorRowArray").split(" ");
			}

			console.log(numberOfRows); 

			return numberOfRows; 

	    	//return new Array[numberOfRows]; 

	    }, 



	    getToDoRowArray: function() {
	    	//return toDoRowArray.findOne({name: "toDoRowArrayObject"}).arrayList; 
	    	var numberOfRows; 
	    	if (Session.get("newToDoRowArray") === undefined) {
				numberOfRows = []; 
			} else {
				numberOfRows = Session.get("newToDoRowArray").split(" ");
			}

			console.log(numberOfRows); 

			return numberOfRows; 

	    	
	    },

	    //delete button should be wired to decrementing the array. 

	}); 

	Template.legislatorRow.helpers({
		getLegID: function(){
			//returns a specific ID for the legislator 
			return this._id + "legRow";
		},

		getLegislatorName: function(){
			var ID = this._id; 
			return legislators.findOne({_id: ID}).name;
		},

		getLegislatorEmail: function(){
			var ID = this._id; 
			return legislators.findOne({_id: ID}).email;
		},

		getLegislatorAddress: function(){
			var ID = this._id; 
			return legislators.findOne({_id: ID}).address;
		},

		/*getSaveLegislatorButtonID: function(){
			var ID = getLegID;
			return this._id +"saveButton";
		},

		getNameID: function(){
			//returns the NAME ID
			var ID = getLegID;
			return this._id+Meteor.call("getOldLegName",ID);
		},

		getEmailID: function(){
			var ID = getLegID;
			return this._id+Meteor.call("getOldLegEmail", ID);
		},

		getEditLegislatorButtonID: function(){
			return this._id +"editButton";
		},
		getAddressID: function(){
			var ID = getLegID;
			return this._id+Meteor.call("getOldLegAddress", ID);
		},

		getDeleteLegislatorButtonID: function(){
			return this._id +"deleteButton";
		}*/
	});

	Template.toDoRow.helpers({
		getToDoRowID: function(){
			return this._id + "toDoRow";
		},

		/*getToDoInputID: function(){
			var ID = getRowID;
			return this.issue+this.text;
		},*/

		getToDoValue: function(){
			//var ID = getRowID;
			//console.log("here"); 
			var ID = this._id; 
			//console.log("and here"); 
			//console.log(actionItems.findOne({_id: ID}).text); 
			return actionItems.findOne({_id: ID}).text;
		},

		/*getGoalInputID: function(){
			var ID = getRowID;
			return this.issue+this.goal;

		},*/

		getGoalValue: function(){
			var ID = this._id; 
			//console.log("and here"); 
			//console.log(actionItems.findOne({_id: ID}).text); 
			return actionItems.findOne({_id: ID}).goal;

		},

		/*getMessageInputID: function(){
			var ID = getRowID;
			return this.issue+this.message;

		},*/

		getMessageValue: function(){
			var ID = this._id; 
			//console.log("and here"); 
			//console.log(actionItems.findOne({_id: ID}).text); 
			return actionItems.findOne({_id: ID}).message;


		},

		/*saveToDoButtonID: function(){
			return this.issue+"save";

		},

		editToDoButtonID: function(){
			return this.issue+'edit';

		},

		deleteToDoButtonID: function(){
			return this.issue+'delete';

		},*/
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

		issueSelected: function() {
			var issueSel = false; 
			if (Session.get("adminSelectedIssue") != undefined) {
				issueSel = true; 
			}
			return issueSel; 
		}, 

		getSelectedIssueName: function() {
			console.log("template should now appear, issue is "); 
			return Session.get("adminSelectedIssue"); 

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

		//Meteor.call("addLegislatorRowFunction");
		//console.log("called in client - addLegRowFunction"); 
		//Router.go("/update");  

		//Meteor.call("addLegislatorRowFunction");
		//console.log("called in client - addLegRowFunction"); 
		//Router.go("/update");  
		//Session.set("newLegislatorRowArray", )

		if (Session.get("newLegislatorRowArray") === undefined) {
			//console.log("here"); 
			Session.set("newLegislatorRowArray", "1");
		} else {
			var numberOfRows = Session.get("newLegislatorRowArray");
			console.log(numberOfRows); 

			//.split("");
			//console.log(Session.get("newLegislatorRowArray"));


			Session.set("newLegislatorRowArray", numberOfRows + " 1");
		}

	},
});

Template.addToDoButton.events({
	"click #addToDoRow": function(event) {
		//Meteor.call("addToDoRowFunction");
		//console.log("called in client - addToDoRowFunction"); 
		//Router.go("/update");  

		if (Session.get("newToDoRowArray") === undefined) {
			//console.log("here"); 
			Session.set("newToDoRowArray", "1");
		} else {
			var numberOfRows = Session.get("newToDoRowArray");
			console.log(numberOfRows); 

			//.split("");
			//console.log(Session.get("newLegislatorRowArray"));


			Session.set("newToDoRowArray", numberOfRows + " 1");
		}
	},
});

/*if (Roles.userIsInRole(Meteor.user(), ['admin'])) {


}
else {
    //$('body').html('<div class="error">You must be logged in to use this application!</div>');
    throw new Meteor.Error(403, 'Permission denied');
}*/
