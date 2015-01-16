Template.body.event({
	"submit .btn btn-default": function(event) {
		myZip = document.getElementById("inputZipCode").value;
		myStory = document.getElementById("inputStory").value;
		myName = document.getElementById("inputName").value;
		
		Meteor.call("modifyUser", {myName, myZip, myStory});
	}
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