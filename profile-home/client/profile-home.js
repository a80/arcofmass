Template.profileHome.helpers({
  loggedIn: function() {
    //verify if user logged in. 
    if (Meteor.userId() === null) {
      console.log('executed, result is false'); 
      return false; 
    } else {
      console.log('executed, result is true'); 
      return true; 
    } 
  }, 
  returnUserId: function() {
    return Meteor.user().username; 
  }
});