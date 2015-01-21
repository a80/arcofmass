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
			if (Meteor.call("cleanInput", myName) != false) {
				myName = Meteor.call("cleanInput", myName);
				Meteor.call("modifyUserName", myName);
			}
			else {
				alert("There was a problem with the input");
			}
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
			if (Meteor.call("cleanInput", myEmail) != false) {
				myEmail = Meteor.call("cleanInput", myEmail);
				var atpos = myEmail.indexOf("@");
				var dotpos = myEmail.lastIndexOf(".");
				if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=myEmail.length) {
					alert("Not a valid e-mail address");
				} else {
				Meteor.call("modifyUserEmail", myEmail);
			}
			else {
				alert("There was a problem with the input");
			}
		},

		"click #editEmailButton" : function(event){
			document.getElementById("saveEmailButton").style.visibility = "visible";
			document.getElementById("editEmailButton").style.visibility = "hidden";
			document.getElementById("inputEmail").readOnly = false;

		},

		"click #saveStoryButton" : function(event){
			document.getElementById("saveStoryButton").style.visibility = "hidden";
			document.getElementById("editStoryButton").style.visibility = "visible";
			document.getElementById("inputStory").readOnly = true;
			
			var myStory = document.getElementById("inputStory").value;
			if (Meteor.call("cleanInput", myStory) != false) {
				myStory = Meteor.call("cleanInput", myStory);
				Meteor.call("modifyUserStory", myStory);
			}
			else {
				alert("There was a problem with the input");
			}

			Meteor.call("modifyUserStory", myStory);
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
			if (Meteor.call("cleanInput", myZip) != false) {
				myZip = Meteor.call("cleanInput", myZip);
				Meteor.call("modifyUserZip", myZip);
			}
			else {
				alert("There was a problem with the input");
			}
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
				
				if (Meteor.call("cleanInput", myOPassword) != false && Meteor.call("cleanInput", myNPassword) != false) {
					myOPassword = Meteor.call("cleanInput", myOPassword);
					myNPassword = Meteor.call("cleanInput", myNPassword);
				
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
				//Meteor.call("modifyUserPassword", myOPassword, myNPassword);
			}
			else{
				document.getElementById("alertMessage").style.visibility = "visible";
			}

		},
	});

Template.userSettings.helpers({

	returnUserId: function() {
		return Meteor.user().username; 
	},

	getUserName: function() {
		var name = Meteor.user().profile.name;
		/*
		if (name.length == 0){
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
		*/
		
		return name;
	},

	getStyle: function() {
		var name = Meteor.user().profile.name;
		if (name.length == 0){
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
	},

	getUserEmail: function() {

		
		return Meteor.user().profile.email.address;

	},

	getUserZipCode: function() {
		return Meteor.user().profile.zip;

	},

	getUserStory: function() {
		return Meteor.user().profile.story;
	},
});

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

