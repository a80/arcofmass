if (Meteor.isServer) {
	ActionItems = new Meteor.Collection("actionitems");
	
	Legislators = new Meteor.Collection("legislators");
}