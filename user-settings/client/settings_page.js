

if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
	Meteor.subscribe("userSettingsData");
	Template.userSettings.events({
		"click #saveButton": function(event) {
			var myZip = document.getElementById("inputZipCode").value;
			var myStory = document.getElementById("inputStory").value;
			var myName = document.getElementById("inputName").value;
			var myEmail = document.getElementById("inputEmail").value;
			var myOPassword = document.getElementById("inputOPassword").value;
			var myNPassword = document.getElementBYId("inputNPassword").value;
			
			console.log("submitted.");

			Meteor.call("modifyUser", myName, myZip, myStory, myEmail, myOPassword, myNPassword);
		},
		
		'click #user-home-button': function() {
    		Router.go('/profile');
  		},
	});


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
} else {
	throw new Meteor.Error('403', 'permission denied');
}