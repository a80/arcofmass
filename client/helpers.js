Meteor.methods({
  /*getUserIssues: function() {
	//Returns the names of the users issues
	var issues = Meteor.Collection("users").issues; 
	console.log("function entered: " + issues); 


	return Meteor.Collection("users").issues; 

    /*return Meteor.user.issues.sort(function(a, b) {
  getUserIssues: function() {
	//Returns the objects for the users issues sorted by how many users care
	valIssues = Meteor.user.issues;
	refIssues = [];
	for (int i = 0; i < valIssues.length; i++) {
		refIssues.push(issues.find({name: valIssues[i]});
	}
    return refIssues.sort(function(a, b) {
        var x = a[count]; var y = b[count];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  },*/ 
  increaseIssueCount: function(issueName) {
	//TAKES THE NAME OF THE ISSUE
	//Increases issue count by one
	//For use when a user adds an issue that they now care about
	issues.find({name: issueName}).count += 1;
  },
  decreaseIssueCount: function(issueName) {
	//TAKES THE NAME OF THE ISSUE
	//Decreases issue count by one
	//For use when a user removes an issue that they no longer care about
	issues.find({name: issueName}).count -= 1;
  },
  getIssuePopularityArray: function() {
	//Returns an array of the issues in decreasing order of number of users that care about the issue
	return issues.find({"count", "desc"});
  },
  increaseToDoCount: function(todoName) {
	//TAKES THE NAME OF THE TODO
	//Increases the todo count by one
	actionItems.find({name: todoName}).count += 1;
  },
  decreaseToDoCount: function(todoName) {
	//TAKES THE NAME OF THE TODO
	//Decreases the todo count by one
	actionItems.find({name: todoName}).count -= 1;
  },
  getIssueCount: function(issueName) {
	//Returns the popularity count of the given issue
	return issues.find({name: issueName}).count;
  },
  insertNewIssue: function(name) {
	//When a new issue has been added, insert it into the issues collection
	issues.insert({name: name, count: 0, important: false});
  },
  toggleIssueImportance: function(myName) {
	//When the issue radio button is clicked, the issue boolean is updated
	var toUpdate = issues.find({name: myName});
	issues.update({name: name}, {$set: {important: !toUpdate.important}});
  },
  returnToDos: function(issue) {
	//Returns the issue's action items
	myActions = [];
	for (item in issue.actionItems) {
		if (item.important)
			myActions.push(item);
	}
	return myActions;
  },
  returnIssueName: function(issue) {
	return issue.name;
  },
  getIssuesArea: function(districtName) {
	return issues.find({"district": districtname});
  },
  setArea: function(zipcode) {
	
  }
  //put comma after above function
});
