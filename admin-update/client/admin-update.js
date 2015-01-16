
var selectedUserIssue = "none"; 

Template.adminUpdate.helpers({
  getUserIssues: function() {
    //Meteor.call("getUserIssues");
    //var userIssues =  
    //console.log("function entered: " + userIssues); 
    console.log(issues.find({}).fetch());
    return issues.find({}); 
    //return ["first issue", "second issue", "third issue"]; 
  }, 
  returnIssueName: function() {
    return this.name;
  },
  returnSelectedIssue: function() {
  	//return 
  },
});

