Meteor.methods({
  getUserIssues: function() {
	//Returns the names of the users issues
    return Meteor.user.issues.sort(function(a, b) {
        var x = a[count]; var y = b[count];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
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
	return issues.find(["count", "desc"]);
  },
  insertNewIssue: function(name) {
	//When a new issue has been added, insert it into the issues collection
	issues.insert({name: name, count: 0, important: false});
  },
  toggleIssueImportance: function(myName) {
	//When the issue radio button is clicked, the issue boolean is updated
	var toUpdate = issues.find({name: myName});
	issues.update({name: name}, {$set: {important: !toUpdate.important}});
  }
  //put comma after above function
});