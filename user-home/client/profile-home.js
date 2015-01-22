Meteor.subscribe("userHomeIssues");

Template.profileHome.events({
	"click #logoutButton": function(event) {
			Meteor.logout();
		},
	'click #user-settings-button': function() {
    Router.go('/user-settings');
  },
});

Template.profileHome.helpers({
	getUserIssues: function() {
		//console.log(issues.find({}).fetch());
    var list = issues.find({name: {$in: Meteor.user().profile.issues}}).fetch();
	
	return _.map(list, function(l) {
    	_.extend(l, {graphID: l.name.replace(/\s*/g, '')});
      	return l;
    	}); 
	},

	returnUserId: function() {
		return Meteor.user().username; 
	},
});
	 
Template.toDoPanel.helpers({
	returnToDos: function(issue) {
		var issueName = this.name;
		var actionItemsForIssue = [];

		actionItemsData = actionItems.find({}).fetch();

		for (var i = 0; i < actionItemsData.length; i++) {
		  //console.log("entered if loop"); 
		  if (actionItemsData[i].issue === issueName) {
			actionItemsForIssue.push(actionItemsData[i]); 
		  }
		}

		_.map(actionItemsForIssue, function(a) {
      		_.extend(a, {toDoID: a._id}); });

      	_.map(actionItemsForIssue, function(a) {
      		_.extend(a, {toDoCheckID: a.message}); }); 

      	return actionItemsForIssue; 

		/*return _.map(actionItemsForIssue, function(a) {
      		_.extend(a, {toDoID: a._id}); 
      		return actionItemsForIssue;  
		});*/
	}, 

	returnToDoName: function() {
		return this.text; 
	}, 

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
	
	returnIssueName: function() {
		return this.name;
	}
});


Template.toDoPanel.events({
	"click .toggle-checked": function (event) {
      	//get the relevant id associated with this checkbox
      	var issueName = this.issue; 
      	//Meteor.call("increaseIssueCount", issueName); 

      	//retrieve parent id. 
    	var checkID = event.currentTarget.id; //this corresponds to the actionItem ID.
    	
    	console.log(checkID);
    	//console.log(actionItems.findOne({_id: checkID}));


    	var toDoName = actionItems.findOne({_id: checkID}).text; //change 





    	Meteor.call("increaseToDoCount", toDoName); 

    	var toDoOfInterest = actionItems.findOne({_id: checkID}); 

    	//console.log(toDoOfInterest.goal); 

    	//get the graph id to change. 

    	var graphIDtoChange = this.issue.replace(/\s*/g, ''); 
    	console.log(graphIDtoChange);

    	graphs[graphIDtoChange] = progressBar("#" + graphIDtoChange, toDoOfInterest.count);

    },

    //select the link corresponding to the list element, display that issue. 

    "click .toDoListItem": function(event) {
    	//retrieve parent id. 
    	var toDoListItemID = event.currentTarget.id; 
    	//console.log("selected: " + toDoListItemID); 

    	//get the count associated with the todo. 
    	var toDoOfInterest = actionItems.findOne({_id: toDoListItemID}); 

    	//console.log(toDoOfInterest.goal); 

    	//get the graph id to change. 

    	var graphIDtoChange = this.issue.replace(/\s*/g, ''); 
    	console.log(graphIDtoChange);

    	graphs[graphIDtoChange] = progressBar("#" + graphIDtoChange, toDoOfInterest.count);
    },

});

var graphs = {};

Template.profileHome.rendered = function() {

	Deps.autorun(function() {
    
	var issueList = issues.find({}).fetch();
    
    _.each(issueList, function(issue) {
      var graphID = issue.name.replace(/\s*/g, '');

      //modify the graph shown here with the one relevant to the to-do.
      //graphs[issue._id] = progressBar("#" + graphID, issue.count);
      graphs[graphID] = progressBar("#" + graphID, issue.count);
    }); 
	});

  //how to vary other elements in progressBar based on function arguments. 

}


function progressBar(el, data) {
	var self = this;
	var canvas; 

  var width = 900; 
  var height = 500;

  var widthScale = d3.scale.linear()
                      .domain([0, 20])
                      .range([0, width]); 

  var color = d3.scale.linear()
                .domain([0, 10])
                .range(["red", "blue"]);


  var createCanvasSvg = function(el) {
    d3.select(el).selectAll("svg").remove();
    canvas = d3.select(el).append("svg").attr("width", width)
                .attr("height", height);
  }

  createCanvasSvg(el);

  var bars = canvas.selectAll("rect")
                  .data([data])
                  .enter()
                    .append("rect")
                    .attr("width", width)
                    .attr("height", function (d) { return widthScale(d); })
                    .attr("y", function(d, i) {return height - widthScale(d) })
                    .attr("fill", function(d) {return color(d)});

}