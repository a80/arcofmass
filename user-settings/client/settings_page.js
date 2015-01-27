cussWords = ["shit", "fuck", "bitch", "damn", "dammit", "fucked", "cunt", "whore", "nigger", "nigga", "douche", "douchebag", "slut", "dick", "hoe", "fucker", "retard", "retarded", "fucktard", "asshole", "bastard", "bitchass","bullshit", "penis"];

Meteor.subscribe("userSettingsData");
	Template.userSettings.events({
		"click #logoutButton": function(event) {
			Meteor.logout();
			Router.go('/');
		},
		'click #user-home-button': function() {
			document.getElementById("formProblem").style.visibility = "hidden";
			var name = document.getElementById("inputName").value;
			var nameReady = document.getElementById("inputName").readOnly;
			var zip = document.getElementById("inputZipcode").value;
			var zipReady = document.getElementById("inputZipcode").readOnly;
			var insp = document.getElementById("inputInspiration").value;
			var inspReady = document.getElementById("inputInspiration").readOnly;
			var story = document.getElementById("inputStory").value;
			var storyReady = document.getElementById("inputStory").readOnly;
			if (name != "" && nameReady == true && zip != "" && zipReady == true && insp != "" && inspReady == true && story != "" && storyReady == true) {
				Router.go('/profile');
			} else {
				document.getElementById("formProblem").style.visibility = "visible";
			}
  		},
		'click #leavePage': function() {
			document.getElementById("formProblem").style.visibility = "hidden";
			var notReady = false;
			if (Meteor.user().profile.issues ==undefined){
				 notReady = true;
			}
			
			var name = document.getElementById("inputName").value;
			var nameReady = document.getElementById("inputName").readOnly;
			var zip = document.getElementById("inputZipcode").value;
			var zipReady = document.getElementById("inputZipcode").readOnly;
			var insp = document.getElementById("inputInspiration").value;
			var inspReady = document.getElementById("inputInspiration").readOnly;
			var story = document.getElementById("inputStory").value;
			var storyReady = document.getElementById("inputStory").readOnly;
			if (name != "" && nameReady == true && zip != "" && zipReady == true && insp != "" && inspReady == true && story != "" && storyReady == true && notReady==false) {
				console.log("HEEERRRREEE");
				Router.go('/profile');
			} else {
				document.getElementById("formProblem").style.visibility = "visible";
			}
  		},

  		"click #saveNameButton": function(event){
  			document.getElementById("alertName").style.visibility = "hidden";

			var myName = document.getElementById("inputName").value;

			Meteor.call("cleanInput", myName, function(err, res) {
				if (res != false && !(new RegExp(cussWords.join("|")).test(res.toLowerCase()))) {
					Meteor.call("modifyUserName", res);
					document.getElementById("saveNameButton").style.visibility = "hidden";
					document.getElementById("editNameButton").style.visibility = "visible";

					document.getElementById("inputName").readOnly = true;
				} else {
					document.getElementById("alertName").style.visibility = "visible";
				}
			}); 
		},

		"click #editNameButton": function(event) {
			document.getElementById("saveNameButton").style.visibility = "visible";
			document.getElementById("editNameButton").style.visibility = "hidden";
			document.getElementById("inputName").readOnly = false;
		},

		"click #saveEmailButton" : function(event) {
			var myEmail = document.getElementById("inputEmail").value;
			Meteor.call("cleanInput", myEmail, function(error, myEmail) {
				if (myEmail != false) {
					var atpos = myEmail.lastIndexOf("@");
					var dotpos = myEmail.lastIndexOf(".");
					if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=myEmail.length) {
						alert("Not a valid e-mail address");
					} else {
					Meteor.call("modifyUserEmail", myEmail);
					document.getElementById("saveEmailButton").style.visibility = "hidden";
					document.getElementById("editEmailButton").style.visibility = "visible";
					document.getElementById("inputEmail").readOnly = true;
					}
				} else {
					alert("There was a problem with the input");
				}
			});
		},

		"click #editEmailButton" : function(event){
			document.getElementById("saveEmailButton").style.visibility = "visible";
			document.getElementById("editEmailButton").style.visibility = "hidden";
			document.getElementById("inputEmail").readOnly = false;

		},

		"click #saveInspirationButton" : function(event) {
			document.getElementById("alertInspiration").style.visibility = "hidden";
			var myInspiration = document.getElementById("inputInspiration").value;
			
			Meteor.call("cleanInput", myInspiration, function(error, myInspiration) {
				if (myInspiration != false && !(new RegExp(cussWords.join("|")).test(myInspiration.toLowerCase()))/* && !(new RegExp("[\\s]").test(myInspiration))*/) {

					Meteor.call("modifyUserInspiration", myInspiration);
					document.getElementById("saveInspirationButton").style.visibility = "hidden";
					document.getElementById("editInspirationButton").style.visibility = "visible";
					document.getElementById("inputInspiration").readOnly = true;

				} else {
					document.getElementById("alertInspiration").style.visibility = "visible";
				}
			});
		},

		"click #editInspirationButton" : function(event){
			document.getElementById("saveInspirationButton").style.visibility = "visible";
			document.getElementById("editInspirationButton").style.visibility = "hidden";
			document.getElementById("inputInspiration").readOnly = false;

		},

		"click #saveStoryButton" : function(event){
			document.getElementById("alertStory").style.visibility = "hidden";
			
			var myStory = document.getElementById("inputStory").value;
			Meteor.call("cleanInput", myStory, function(error, myStory) {
				if (myStory != false && !(new RegExp(cussWords.join("|")).test(myStory.toLowerCase()))) {

					//console.log(myStory); 
					Meteor.call("modifyUserStory", myStory);
					document.getElementById("saveStoryButton").style.visibility = "hidden";
					document.getElementById("editStoryButton").style.visibility = "visible";
					document.getElementById("inputStory").readOnly = true;
				} else {
					document.getElementById("alertStory").style.visibility = "visible";
				}
			});
		},

		"click #editStoryButton" : function(event){
			document.getElementById("saveStoryButton").style.visibility = "visible";
			document.getElementById("editStoryButton").style.visibility = "hidden";
			document.getElementById("inputStory").readOnly = false;

		},

		"click #saveZipCodeButton" : function(event){
			
			document.getElementById("alertZip").style.visibility = "hidden";
			var myZip = document.getElementById("inputZipcode").value;
			Meteor.call("cleanInput", myZip, function(error, myZip) {
				if (myZip != false) {
					//RegExp found on: http://stackoverflow.com/questions/2577236/regex-for-zip-code
					var regPostalCode = new RegExp("^\\d{5}(-\\d{4})?$");
					if (regPostalCode.test(myZip) == true) {
						Meteor.call("modifyUserZip", myZip);
						Meteor.call("assignUserDistrict");
						document.getElementById("saveZipCodeButton").style.visibility = "hidden";
						document.getElementById("editZipCodeButton").style.visibility = "visible";
						document.getElementById("inputZipcode").readOnly = true;
					} else {
					document.getElementById("alertZip").style.visibility = "visible";
					}
				}
				else {
					document.getElementById("alertZip").style.visibility = "visible";
				}
			});
		},

		"click #editZipCodeButton" : function(event){
			document.getElementById("saveZipCodeButton").style.visibility = "visible";
			document.getElementById("editZipCodeButton").style.visibility = "hidden";
			document.getElementById("inputZipcode").readOnly = false;
		},

		"click #savePasswordButton" : function(event) {
			document.getElementById("savedSuccessfullyMessage").style.visibility = "hidden";
			document.getElementById("alertMessageMatch").style.visibility = "hidden";
			document.getElementById("alertMessageWrong").style.visibility = "hidden";
			document.getElementById("alertMessageBad").style.visibility = "hidden";
			if (document.getElementById("inputNPassword").value === document.getElementById("confirmNPassword").value){
				var myOPassword = document.getElementById("inputOPassword").value;
				var myNPassword = document.getElementById("inputNPassword").value;
				document.getElementById("inputOPassword").value = "";
		  		document.getElementById("inputNPassword").value = "";
		  		document.getElementById("confirmNPassword").value = "";	
				
				
				Meteor.call("cleanInput", myOPassword, function(error, myOPassword) {
					if (myOPassword != false) {
						Meteor.call("cleanInput", myNPassword, function(error, myNPassword) {
							if (myNPassword != false) {
							Accounts.changePassword(myOPassword, myNPassword, function(error) {
								if (error) {
									//console.log(error);
									//console.log("Failed to change password.");
									document.getElementById("alertMessageWrong").style.visibility = "visible";

									//Tell user that they entered their old password incorrectly?
								} else {
									//console.log("Successfully changed password.");
									document.getElementById("savedSuccessfullyMessage").style.visibility = "visible";
									
								}
							});
							}
							else {
								document.getElementById("alertMessageBad").style.visibility = "visible";
							}
						});
					}
				});
		} else {
			document.getElementById("savedSuccessfullyMessage").style.visibility = "hidden";
			document.getElementById("alertMessageMatch").style.visibility = "visible";
		}
	},

	"click .list-group-item": function(event, template){
			//event.target.addClass("active");

			selectedIssueInList = $(event.target).text();


			if (template.find(".active") === null) {
				$(event.target).addClass('active');
				//event.target.addClass("active");
				Meteor.call("addUserIssueItem", selectedIssueInList); 
			} else {
				if ($(event.target).hasClass('active')) {
					$(event.target).removeClass('active');
					Meteor.call("deleteUserIssueItem", selectedIssueInList);  
				} else {
					$(event.target).addClass('active');
					Meteor.call("addUserIssueItem", selectedIssueInList); 
				}
				/*console.log("entering the else"); 
				previous = template.find(".active");
				console.log(previous); 
				console.log("here"); 
				template.find(".active").removeClass('active'); */

				//console.log(template.find(".active").classList);

				//template.find(".active").classList.remove("active"); 
			}

		/*"click .list-group-item": function(event){
			
			previous.removeClass('active');
			$(event.target).addClass('active'); */
			
			
			//selectedIssueInList = $(".active").text();
			//selectedIssueInList = template.find(".active").text();

			//console.log("issue selected:"); 

			//console.log(selectedIssueInList); 

			//Meteor.call("addUserIssueItem", selectedIssueInList); 

			//console.log("clicked"); 


			//TODO!
		},
	});

Template.userSettings.helpers({

	returnUserId: function() {
		return Meteor.user().username; 
	},

	getUserName: function() {
		var name = Meteor.user().profile.name;
		
		return name;
	
	},
	returnInspiration: function() {
		try {
			insp = Meteor.user().profile.inspiration;
			
			if (insp != null && insp != "") {
				return insp;
			} else {
				return "Someone";
			}
		} catch(e) {
			return "Someone";
		}
	},
	/*
	changeNameStyle: function() {
		var name = Meteor.user().profile.name;
		if (name.length !== 0){
			console.log("aaaaaayyyooooooasdfasdf")
			document.getElementById("saveNameButton").style.visibility = "hidden";
			document.getElementById("editNameButton").style.visibility = "visible";
			document.getElementById("inputName").readOnly = true;
		}
		else{
			document.getElementById("saveNameButton").style.visibility = "visible";
			document.getElementById("editNameButton").style.visibility = "hidden";
			document.getElementById("inputName").readOnly = false;
		}
	},
	/*
	nameStyle: function(){
		var input = document.getElementById("inputName").value;
		if (input.length ==0){
			//nothing in database
			
			document.getElementById("inputName").readOnly = false;
			document.getElementById("editNameButton").style.visibility = "hidden";
			document.getElementById("saveNameButton").style.visibility = "visible";
			
		}
		else{
			
			document.getElementById("inputName").readOnly = true;
			document.getElementById("editNameButton").style.visibility = "visible";
			document.getElementById("saveNameButton").style.visibility = "hidden";
			
			
		}
	},*/



	getUserEmail: function() {

		return Meteor.user().profile.email.address;

	},

	getUserZipCode: function() {
		return Meteor.user().profile.zip;

	},

	getUserStory: function() {
		return Meteor.user().profile.story;
	},

	getUserInspiration: function() {
		return Meteor.user().profile.inspiration;
	},

	getUserIssues: function() {
		//console.log(issues.find({}).fetch());
    return issues.find({}).fetch();
	
	//map IDs in here.
	},

	returnIssueName: function() {
		return this.name;
	},

	isActive: function() {
		var activeClass = ""; 

		issuesForUser = Meteor.user().profile.issues;
		//console.log("issues for user"); 
		//console.log(issuesForUser); 

		for (var i = 0; i < issuesForUser.length; i++) {
			if (this.name === issuesForUser[i]) {
				activeClass = "active"; 
			} 
		}

		/*if (Meteor.users.findOne({_id: this.userId}).profile.issues) {
			r
		}*/

		return activeClass;

		//return "" 
	},

});


/*Template.issueCheckBoxField.helpers({
	returnIssueName: function() {
		return this.name;
	},
})*/

/*if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {



	/*
	if (Meteor.IsClient){
		Template.body.event({
			"submit .name-enter": function(event) {

			var text = event.target.text.value;

			Tasks.insert({
				text: text,
				
			});

			//Clears the form
			event.target.text.value = "";
		
			//prevent default form submit
			return false;
			}
		});

		Template.body.event({
			"submit .username-enter": function(event) {

			var text = event.target.text.value;

			Tasks.insert({
				text: text,
				
			});

			//Clears the form
			event.target.text.value = "";
		
			//prevent default form submit
			return false;
			}
		});

		Template.body.event({
			"submit .email-enter": function(event) {

			var text = event.target.text.value;

			Tasks.insert({
				text: text,
				
			});

			//Clears the form
			event.target.text.value = "";
		
			//prevent default form submit
			return false;
			}
		});

		Template.body.event({
			"submit .zipcode-enter": function(event) {

			var text = event.target.text.value;

			Tasks.insert({
				text: text,
				
			});

			//Clears the form
			event.target.text.value = "";
		
			//prevent default form submit
			return false;
			}
		});


		Template.body.event({
			"submit .story-enter": function(event) {

			var text = event.target.text.value;

			Tasks.insert({
				text: text,
				
			});

			//Clears the form
			event.target.text.value = "";
		
			//prevent default form submit
			return false;
			}
		});
	}
	*/

