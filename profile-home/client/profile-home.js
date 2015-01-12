if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.profileHome.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.profileHome.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
	document.getElementById("name-header").innerHTML = Meteor.user.username;
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
