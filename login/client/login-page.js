Router.route('/', function() {
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
    }
	'submit #login-button' : function(e, t) {
		e.preventDefault();
		var username = t.find('#user-field').value;
		var password = t.find('#password-field').value;
		Meteor.loginWithPassword(username, password, function(err)) {
			if(err)
				//user was not found
				//inform user that login attempt has failed
		}
	}
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
