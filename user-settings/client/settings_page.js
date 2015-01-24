Meteor.subscribe("userSettingsData");
	Template.userSettings.events({
		"click #logoutButton": function(event) {
			Meteor.logout();
		},
		'click #user-home-button': function() {
    		Router.go('/profile');
  		},

  		"click #saveNameButton": function(event){
			document.getElementById("saveNameButton").style.visibility = "hidden";
			document.getElementById("editNameButton").style.visibility = "visible";

			document.getElementById("inputName").readOnly = true;

			console.log("saveNameButton pressed");
			
			var myName = document.getElementById("inputName").value;

			Meteor.call("cleanInput", myName, function(err, res) {
				if (res != false){
					console.log(res); 
					Meteor.call("modifyUserName", res);
				} else {
					alert("There was a problem with the input");
				}
			}); 
		},

		"click #editNameButton": function(event) {
			document.getElementById("saveNameButton").style.visibility = "visible";
			document.getElementById("editNameButton").style.visibility = "hidden";
			document.getElementById("inputName").readOnly = false;
		},

		"click #saveEmailButton" : function(event) {
			document.getElementById("saveEmailButton").style.visibility = "hidden";
			document.getElementById("editEmailButton").style.visibility = "visible";
			document.getElementById("inputEmail").readOnly = true;
			
			var myEmail = document.getElementById("inputEmail").value;
			Meteor.call("cleanInput", myEmail, function(error, myEmail) {
				if (myEmail != false) {
					var atpos = myEmail.indexOf("@");
					var dotpos = myEmail.lastIndexOf(".");
					if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=myEmail.length) {
						alert("Not a valid e-mail address");
					} else {
					Meteor.call("modifyUserEmail", myEmail);
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
			document.getElementById("saveInspirationButton").style.visibility = "hidden";
			document.getElementById("editInspirationButton").style.visibility = "visible";
			document.getElementById("inputInspiration").readOnly = true;

			var myInspiration = document.getElementById("inputInspiration").value;
			
			Meteor.call("cleanInput", myInspiration, function(error, myInspiration) {
				if (myInspiration != false){
					Meteor.call("modifyUserInspiration", myInspiration);
				} else {
					alert("There was a problem with the input");
				}
			});
		},

		"click #editInspirationButton" : function(event){
			document.getElementById("saveInspirationButton").style.visibility = "visible";
			document.getElementById("editInspirationButton").style.visibility = "hidden";
			document.getElementById("inputInspiration").readOnly = false;

		},

		"click #saveStoryButton" : function(event){
			document.getElementById("saveStoryButton").style.visibility = "hidden";
			document.getElementById("editStoryButton").style.visibility = "visible";
			document.getElementById("inputStory").readOnly = true;
			
			var myStory = document.getElementById("inputStory").value;
			Meteor.call("cleanInput", myStory, function(error, myStory) {
				if (myStory != false) {

					console.log(myStory); 
					Meteor.call("modifyUserStory", myStory);
				} else {
					alert("There was a problem with the input");
				}
			});
		},

		"click #editStoryButton" : function(event){
			document.getElementById("saveStoryButton").style.visibility = "visible";
			document.getElementById("editStoryButton").style.visibility = "hidden";
			document.getElementById("inputStory").readOnly = false;

		},

		"click #saveZipCodeButton" : function(event){
			document.getElementById("saveZipCodeButton").style.visibility = "hidden";
			document.getElementById("editZipCodeButton").style.visibility = "visible";
			document.getElementById("inputZipcode").readOnly = true;
			
			var myZip = document.getElementById("inputZipcode").value;
			Meteor.call("cleanInput", myZip, function(error, myZip) {
				if (myZip != false) {
					var regPostalCode = new RegExp("^\\d{5}(-\\d{4})?$");
					if (regPostalCode.test(myZip) == true) {
						Meteor.call("modifyUserZip", myZip);
						Meteor.call("assignUserDistrict");
					} else {
					alert("There was a problem with the input");
					}
				}
				else {
					alert("There was a problem with the input");
				}
			});
		},

		"click #editZipCodeButton" : function(event){
			document.getElementById("saveZipCodeButton").style.visibility = "visible";
			document.getElementById("editZipCodeButton").style.visibility = "hidden";
			document.getElementById("inputZipcode").readOnly = false;
		},

		"click #savePasswordButton" : function(event) {
			if (document.getElementById("inputNPassword").value === document.getElementById("confirmNPassword").value){
				document.getElementById("savedSuccessfullyMessage").style.visibility = "visible";
				document.getElementById("alertMessage").style.visibility = "hidden";
				
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
									console.log(error);
									console.log("Failed to change password.");

									//Tell user that they entered their old password incorrectly?
								} else {
									console.log("Successfully changed password.");
									document.getElementById("savedSuccessfullyMessage").style.visibility = "visible";
									
								}
							});
							}
							else {
								alert("There was a problem with the input");
							}
						});
					}
				});
		} else {
			document.getElementById("savedSuccessfullyMessage").style.visibility = "hidden";
			document.getElementById("alertMessage").style.visibility = "visible";
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

			console.log("issue selected:"); 

			console.log(selectedIssueInList); 

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
		console.log("issues for user"); 
		console.log(issuesForUser); 

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

