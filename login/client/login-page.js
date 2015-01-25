//old code

Template.login.events({
  //define event for making text transition
  'mouseenter #username-field': function() {
    var usernameField = document.getElementById('username-field');
    /*$("#password-field").style.visibility = "hidden";*/ //seems jQuery not installed.
    usernameField.placeholder = "username:";

  },

  'mouseleave #username-field': function() {
    var usernameField = document.getElementById('username-field');
    /*$("#password-field").style.visibility = "hidden";*/ //seems jQuery not installed.
    usernameField.placeholder = "you";
  },

  'click #username-field': function() {
    var passwordField = document.getElementById('password-field');
    /*$("#password-field").style.visibility = "hidden";*/ //seems jQuery not installed.
    passwordField.style.visibility = "visible";

    document.getElementById('login-button').style.visibility = "visible";
    document.getElementById('new-user-button').style.visibility = "visible";
  },

  'keypress #username-field': function() {
    var passwordField = document.getElementById('password-field');
    /*$("#password-field").style.visibility = "hidden";*/ //seems jQuery not installed.
    passwordField.style.visibility = "visible";

    document.getElementById('login-button').style.visibility = "visible";
    document.getElementById('new-user-button').style.visibility = "visible";
  },

  'click #login-button': function(event, template) {
	document.getElementById("loginFail").style.visibilty = "hidden";
    event.preventDefault();
    var username = template.find("#username-field").value;
    var password = template.find("#password-field").value;
	Meteor.call("cleanInput", username, function(error, username) {
		if (username != false) {
			Meteor.call("cleanInput", password, function(error, password) {
				if (password != false) {
					Meteor.loginWithPassword(username, password, function(error) {
					  if (error) {
						console.log('login failed');
						document.getElementById("loginFail").style.visibilty = "visible";
					  } else {
						console.log('login-succeeded');
						Router.go('/profile');
					  }
					});
				} else {
					alert("There was a problem with the password");
				}
			});
		} else {
			alert("There was a problem with the username");
		}
	});
    //var usernameField = document.getElementById('username-field');
    //var username = usernameField.value; 

    //console.log(username + "; " + password);
    //console.log('executed');


    return false; 
  },

  /*'click #new-user-button': function(event, template) {
    event.preventDefault();
    var username = template.find("#username-field").value;
    var password = template.find("#password-field").value;
    
    Accounts.createUser({username: username, password: password, roles: []}, function(error) {
      if (error) {
        console.log('Failed to create new user.');
      } else {
        console.log('Succesfully created new user.');
      }
    });
    return false; 
  },*/

  'click #new-user-button': function(event, template) {
    event.preventDefault();
    var username = template.find("#username-field").value;
    var password = template.find("#password-field").value;
	
	Meteor.call("cleanInput", username, function(error, username) {
		if (username != false) {
			Meteor.call("cleanInput", password, function(error, password) {
				if (password != false) {	
					Accounts.createUser({username: username, password: password});
					
					Meteor.call("addNewRegularUser", username, function(error) {
					  if (error) {

					  } else {
						Meteor.loginWithPassword(username, password, function(error) {
						  if (error) {
							console.log('login failed');
						  } else {
								console.log('login-succeeded');
								Router.go('/user-settings');
							}
						});
					  }
					}); 
				} else {
					alert("There was a problem with the password");
				}
			});
		} else {
			alert("There was a problem with the username");
		}
	});
    

    /*, function(error) {
      if (error) {
        console.log('Failed to create new user.');
      } else {
        console.log('Succesfully created new user.');
      }
    });*/

    return false; 
  },

	//ADDING AN ADMIN BUTTON
	//TAKE THIS OUT LATER
	
	

  'click #adminLoginLink': function() {
    Router.go('/admin-login');
  },

});


Template.adminLogin.events({
  'mouseenter #username-field': function() {
    var usernameField = document.getElementById('username-field');
    /*$("#password-field").style.visibility = "hidden";*/ //seems jQuery not installed.
    usernameField.placeholder = "username:";

  },

  'mouseleave #username-field': function() {
    var usernameField = document.getElementById('username-field');
    /*$("#password-field").style.visibility = "hidden";*/ //seems jQuery not installed.
    usernameField.placeholder = "you";
  },

  'click #username-field': function() {
    var passwordField = document.getElementById('password-field');
    /*$("#password-field").style.visibility = "hidden";*/ //seems jQuery not installed.
    passwordField.style.visibility = "visible";


    document.getElementById('admin-login-button').style.visibility = "visible";
    document.getElementById('new-admin-button').style.visibility = "visible";
  },

  'keypress #username-field': function() {
    var passwordField = document.getElementById('password-field');
    /*$("#password-field").style.visibility = "hidden";*/ //seems jQuery not installed.
    passwordField.style.visibility = "visible";

    document.getElementById('admin-login-button').style.visibility = "visible";
    document.getElementById('new-admin-button').style.visibility = "visible";
  },
  'click #userLoginLink': function() {
    Router.go('/');
  },

  'click #new-admin-button': function(event, template) {
    event.preventDefault();
    var username = template.find("#username-field").value;
    var password = template.find("#password-field").value;
	Meteor.call("cleanInput", username, function(error, username) {
		if (username != false) {
			Meteor.call("cleanInput", password, function(error, password) {
				if (password != false) {	
					Accounts.createUser({username: username, password: password}); 

					Meteor.call("addNewAdmin", username, function(error) {
					  if (error) {

					  } else {
						Meteor.loginWithPassword(username, password, function(error) {
						  if (error) {
							console.log('admin login failed');
						  } else {
								console.log('admin-login-succeeded');
								Router.go('/admin');
							}
						});
					  }
					}); 
				} else {
					alert("There was a problem with the password");
				}
			});
		} else {
			alert("There was a problem with the username");
		}
	});

    
    //var usernameField = document.getElementById('username-field');
    //var username = usernameField.value; 

    //console.log(username + "; " + password);
    //console.log('executed');
     


    //var id = Meteor.users.find(); 

    /*console.log("should get to here"); 

    console.log(id); 

    Roles.addUsersToRoles(id, ['admin']);

    console.log("got here.");*/
  
    /*//customize user creation - delete for now. 
    Accounts.onCreateUser(function(options, user) {
      user.issues = [];
      if (options.profile) 
        user.profile = options.profile;  
      return user; 
    }); */

    return false; 
  },

  'click #admin-login-button': function(event, template) {
    event.preventDefault();
    var username = template.find("#username-field").value;
    var password = template.find("#password-field").value;
	
	Meteor.call("cleanInput", username, function(error, username) {
		if (username != false) {
			Meteor.call("cleanInput", password, function(error, password) {
				if (password != false) {	
					Meteor.loginWithPassword(username, password, function(error) {
					  if (error) {
						console.log('admin login failed');
					  } else {
						console.log('admin login-succeeded');
						Router.go('/admin');
						//Router.go('/admin');
						//this.redirect('/admin'); 
					  }
					});
				} else {
					alert("There was a problem with the password");
				}
			});
		} else {
			alert("There was a problem with the username");
		}
	});
    //var usernameField = document.getElementById('username-field');
    //var username = usernameField.value; 

    //console.log(username + "; " + password);
    //console.log('executed');
    //this.redirect("/admin"); 

    return false; 
  },
})

/*Router.route('/', function() {
  this.render('login');
});

Router.map(function() {
  this.route('login');
});

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.login.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.login.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    },

    'submit #login-button' : function(e, t) {
		e.preventDefault();
		var username = t.find('#user-field').value;
		var password = t.find('#password-field').value;
		Meteor.loginWithPassword(username, password, function(err) {
			if(err)
				//user was not found
				//inform user that login attempt has failed
		});
	}
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}*/
