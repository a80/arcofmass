Meteor.methods({
  getUserIssues: function(user) {
	//Returns the names of the users issues
	return user.issues;
  }, 
  increaseIssueCount: function(issue) {
	//Increases issue count by one
	//For use when a user adds an issue that they now care about
	issue.count += 1;
  },
  decreaseIssueCount: function(issue) {
	//Decreases issue count by one
	//For use when a user removes an issue that they no longer care about
	issue.count -= 1;
  },
  getIssuePopularityArray: function() {
	//Returns an array of the issues in decreasing order of number of users that care about the issue
	//var return = issues.find(["count", "desc"]);
	return issues.find(["count", "desc"]);
  }
  //put comma after above function
});