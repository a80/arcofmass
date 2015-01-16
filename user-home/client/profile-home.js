//Meteor.subscribe("userIssues");

//issues = new Mongo.Collection("issues"); //changed from Meteor
if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
	Template.profileHome.helpers({
	  getUserIssues: function() {
		//Meteor.call("getUserIssues");
		//var userIssues =  
		//console.log("function entered: " + userIssues); 
		console.log(issues.find({}).fetch());
		return issues.find({}); 
		//return ["first issue", "second issue", "third issue"]; 
	  }
	 });
	 
	Template.toDoPanel.helpers({
		returnToDos: function(issue) {
			//Returns the issue's action items
			/*myActions = [];
			for (item in issue.actionItems) {
				if (item.important)
					myActions.push(item);
			}
			return myActions;
			*/
			//return ["First todo", "Second todo", "Third todo"];

		var issueName = this.name;
		console.log("within returnToDos, issueName" + issueName); 
		var actionItemsForIssue = [];
		console.log(actionItems.find({}).fetch()[0]);

		actionItemsData = actionItems.find({}).fetch();

		console.log(actionItemsData.length);  
		console.log(actionItemsData[0]);

		for (var i = 0; i < actionItemsData.length; i++) {
		  console.log("entered if loop"); 
		  if (actionItemsData[i].issue === issueName) {
			actionItemsForIssue.push(actionItemsData[i]); 
		  }
		}

		console.log(actionItemsForIssue);

		return actionItemsForIssue;  

		}, 

	  returnToDoName: function() {
		return this.text; 
		//console.log(this.text); 
	  }
	});

	Template.issuePanel.helpers({
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
	  },
	  returnIssueName: function() {
		return this.name;
	  }
	});

	Template.issuePanel.progressBar = function() {
	  /*d3.select("body")
		.append("p")
		.style("color", "red")
		.text("hi, what's up?");*/


	  //order seems to matter in d3. 

	   

	  var widthScale = d3.scale.linear()
						  .domain([0, 60])
						  .range([0, 500]);

	  var color = d3.scale.linear()
					.domain([0, 60])
					.range(["red", "blue"]);

	  var axis = d3.svg.axis()
					.ticks(5)
					.scale(widthScale); 

	  /*var canvas = d3.select("#bar")
					.append("svg")
					.attr("width", 500)
					.attr("height", 1000)
					.attr("transform", "translate(50, 50)");
					//.call(axis);

	  /*var circle = canvas.append("circle")
					.attr("cx", 250)
					.attr("cy", 250)
					.attr("r", 50)
					.attr("fill", "red");

	  var rectangle = canvas.append("rect")
						.attr("width", 10)
						.attr("height", 20); */

	  //var dataArray = [20, 40, 50, 60]; 

	  var dataArray = [50]; 

	  var bars = canvas.selectAll("rect")
					.data(dataArray)
					.enter()
					  .append("rect")
					  .attr("height", function(d) {
						//return d;
						return widthScale(d);  
					  })
					  .attr("width", 500)
					  .attr("fill", function(d) { return color(d) })
					  .attr("y", function(d, i) { return i*100}); 

	  canvas.append("g")
		.attr("transform", "translate(0, 400)")
		.call(axis);

	}
} else {
	throw new Meteor.Error('403', 'permission denied');
}
