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

    console.log("increaseIssueCount executed"); 
	  issues.update({name: issueName}, {$inc: {count: 1}});

    //console.log("increaseIssueCount executed"); 
    //issues.findOne({name: issueName}).count += 1;
  },
  decreaseIssueCount: function(issueName) {
	//TAKES THE NAME OF THE ISSUE
	//Decreases issue count by one
	//For use when a user removes an issue that they no longer care about
	issues.find({name: issueName}).count -= 1;
  },
  getIssueCountArray: function() {
	//Returns an array of the issues in decreasing order of number of users that care about the issue
	//return issues.find({"count", "desc"});
	return issues.find({count: "desc"});
  },
  increaseToDoCount: function(todoName) {
	//TAKES THE NAME OF THE TODO
	//Increases the todo count by one
	//actionItems.find({text: todoName}).count += 1;
    console.log("increaseToDoCount called.");
    actionItems.update({text: todoName}, {$inc: {count: 1}});
  },
  decreaseToDoCount: function(todoName) {
	//TAKES THE NAME OF THE TODO
	//Decreases the todo count by one
	actionItems.find({text: todoName}).count -= 1;
  },
  getIssueCount: function(issueName) {
	//TAKES THE NAME OF THE ISSUE
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
	
  },
  modifyUserName: function(myName){
	Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.name":myName}});
  },
  modifyUserZip: function(myZip) {
	Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.zip":myZip}});
  },
  modifyUserStory: function(myStory) {
	Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.story":myStory}});
  },
  modifyUserEmail: function(myEmail) {
	Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.email":{address: myEmail, verified: false}}});
  },
  modifyUserPassword: function(myOPassword, myNPassword) {
	  console.log("exec");
     
  },

  addNewAdmin: function(username) {
  	console.log('addNewAdmin accessed');

  	
    //var username = template.find("#username-field").value;
    //var password = template.find("#password-field").value;
    //var usernameField = document.getElementById('username-field');
    //var username = usernameField.value; 

    //console.log(username + "; " + password);
    //console.log('executed');
    //var id = Accounts.createUser({username: username, password: password}); 

      /*, function(error) {
      if (error) {
        console.log(error);
        console.log('Failed to create new admin.');
      } else {
        console.log('Succesfully created new admin.');
      }
    });*/

    var id = Meteor.users.findOne({username: username})._id; 

    //console.log("should get to here"); 

    //console.log(id); 

    Roles.addUsersToRoles(id, ['admin']);

    //console.log("got here.");
	
    /*//customize user creation - delete for now. 
    Accounts.onCreateUser(function(options, user) {
      user.issues = [];
      if (options.profile) 
        user.profile = options.profile;  
      return user; 
    }); */

    //return false; 

  },

  addNewRegularUser: function(username) {

  	console.log('addNewRegularUser accessed');

  	
    //var username = template.find("#username-field").value;
    //var password = template.find("#password-field").value;
    //var usernameField = document.getElementById('username-field');
    //var username = usernameField.value; 

    //console.log(username + "; " + password);
    //console.log('executed');
    //var id = Accounts.createUser({username: username, password: password}); 

      /*, function(error) {
      if (error) {
        console.log(error);
        console.log('Failed to create new admin.');
      } else {
        console.log('Succesfully created new admin.');
      }
    });*/

    var id = Meteor.users.findOne({username: username})._id; 

    //console.log("should get to here"); 

    //console.log(id); 

    Roles.addUsersToRoles(id, ['regular']);


  },
  
  addNewLegislator: function(myName, myEmail, myAddress, myIssue) {
	  console.log("in addNewLegislator");
    legislators.upsert({name: myName}, {$set: {name: myName, email: myEmail, address: myAddress, issue: myIssue}});
  },
  addNewTodo: function(myName, myGoal, myMessage, myIssue, isImportant) {
	actionItems.upsert({text: myName}, {$set: {text: myName, goal: myGoal, message: myMessage, issue: myIssue, important: isImportant}});	
  },
  deleteTodo: function(myName) {
	actionItems.remove({name: myName});
  },
  deleteLegislator: function(myName) {
	legislators.remove({name: myName});
  },
  addNewIssue: function(myName) {
	  issues.insert({name: myName, count: 0});
  },
  delIssue: function(myName) {
	issues.remove({name: myName});
  }, 

  /*addToDoRowFunction: function() {
    //find stuff.
    //console.log("object created in server"); 
    

    toDoRowArray.upsert({name: "toDoRowArrayObject"}, {$push: {arrayList: 1}}); 

  }, 

  addLegislatorRowFunction: function() {
    legislatorRowArray.upsert({name: "legislatorRowArrayObject"}, {$push: {arrayList: 1}}); 

  },

  deleteToDoRowFunction: function() {
    toDoRowArray.upsert({name: "toDoRowArrayObject"}, {$pop: {arrayList: 1}}); 
  }, 

  deleteLegislatorRowFunction: function() {
    legislatorRowArray.upsert({name: "legislatorRowArrayObject"}, {$pop: {arrayList: 1}}); 
  },

  adminUpdateSelectIssue: function(issueName) {
    selectedIssue.upsert({name: "selectedIssueObject"}, {$set: {selectedIssue: issueName}}); 
  },*/
  cleanInput: function(str) {
	newstr = str.replace(/[^a-z0-9@ '\.,_-]/gim,"");
	if (newstr != "" && newstr != null && str == newstr) {
		return str;
	} else {
		return false;
	}
  },
  
  getOldLegName: function(ID) {
	return legislators.find({id: ID}).name;
  },
  getOldLegEmail: function(ID) {
	return legislators.find({id: ID}).email;
  },
  getOldLegAddress: function(ID) {
	return legislators.find({id: ID}).address;
  },
  getOldTodoText: function(ID) {
	return actionItems.find({id: ID}).text;
  },
  getOldTodoGoal: function(ID) {
	return actionItems.find({id: ID}).goal;
  },
  getOldTodoMessage: function(ID) {
	return actionItems.find({id: ID}).message;
  },
  getOldTodoImportance: function(ID) {
	return actionItems.finc({id: ID}).important;
  },
  addUserIssueItem: function(issueName) {
	 //curr = Meteor.user().profile.issues;
	 //newIssues = curr.push(issueName);
	 //Meteor.user().profile.issues = newIssues;
   Meteor.users.upsert({_id:Meteor.userId()}, {$push :{"profile.issues": issueName}});
  },
  deleteUserIssueItem: function(issueName) {
    Meteor.users.upsert({_id:Meteor.userId()}, {$pull :{"profile.issues": issueName}});

  },

  //put comma after above function
});
