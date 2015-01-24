//<<<<<<< HEAD
Template.adminHome.helpers({
	returnUserId: function() {
		return Meteor.user().username; 
	},

	toggleListViewDefault: function() {
		if (Session.get("toggleListView") === undefined) {
			return true; 
		} else {
			return Session.get("toggleListView"); 
		}
	}, 

	returnListActive: function() {
		var className; 
		
		if (Session.get("toggleListView") === undefined) {
			className = "active"; 
		} else {
			if (Session.get("toggleListView")) {
				className = "active"; 
			} else {
				className = ""; 
			} 
		}
		return className; 
	}, 

	returnGraphActive: function() {
		var className; 
		
		if (Session.get("toggleListView") === undefined) {
			className = ""; 
		} else {
			if (Session.get("toggleListView")) {
				className = ""; 
			} else {
				className = "active"; 
			} 
		}
		return className;
	}



});

Template.adminIssueListView.helpers({
	getUserIssues: function() {
		console.log(issues.find({}).fetch());
		return issues.find({});  
	},
})

Template.adminIssuePanel.helpers({
	returnIssueName: function() {
		return this.name;
	}, 
	returnIssueCount: function() {
		return this.count; 
	}, 

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

      	return actionItemsForIssue; 
	}, 

	returnToDoName: function() {
		return this.text; 
	}, 


});


Template.adminHome.events({
	"click #update-button": function(event) {
		Router.go("/update"); 
	},
	"click #logoutButton": function(event) {
		Meteor.logout();
		Router.go("/"); 
	}, 
	"click #toggleListView": function() {
		Session.set("toggleListView", true);
	},
	"click #toggleGraphView": function() {
		Session.set("toggleListView", false);
	}
});


//adding graphs to adminHome

var graphs = {};

Template.adminIssueGraphView.rendered = function() {

	Deps.autorun(function() {
	var issueList = issues.find({}).fetch();
    //var notifications = notifications.find({issueId: this._id}, {sort: {dateCompleted: -1}, limit: 3}); 

    console.log(notifications); 
    
    _.each(issueList, function(issue) {
      var graphID = issue.name.replace(/\s*/g, '');
      graphs[graphID] = progressBar(".adminHomeGraphDiv", issue.count, "what: " + issue.name);
    }); 
	});

  //how to vary other elements in progressBar based on function arguments. 

}


function progressBar(el, data, label) {
 	var self = this;
	var canvas; 

  	var width = 950; 
  	var height = 400;

  	var widthScale = d3.scale.linear()
                      .domain([0, 20])
                      .range([0, height]); 

  	var color = d3.scale.linear()
                .domain([0, 10])
                .range(["red", "blue"]);

    var yAxis = d3.svg.axis()
    				.scale(d3.scale.linear().domain([0, 20]).range([height, 0]))
    				.orient("left")
    				.ticks(5); 


  	var createCanvasSvg = function(el) {
      d3.select(el)
        .selectAll("svg")
        .remove();
        
      	canvas = d3.select(el)
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                  .append("g")
                  .attr("transform", "translate(0, 50)"); 
  }

  	createCanvasSvg(el);

  	/*canvas.attr("class", "axis")
  			.attr("transform", "translate(" + padding + ",0)")
    		.call(yAxis);*/

  	/*var bars = canvas.selectAll("rect")
  					.data([20, 40, 50])
  					.enter()
  						.append("rect")
  						.attr("width", function(d) {return d; })
  						.attr("height", 50)
  						.attr("y", function(d, i) {return i*100; });*/

  	var bars = canvas.selectAll("rect")
                  .data([10, 20, 30, 40, 50])
                  .enter()
                    .append("rect")
                    .attr("y", 600)
                    .attr("width", 100)
                    .attr("fill", "orange")
                    .transition()
                    .duration(1000)
                    .attr("height", function (d) { return widthScale(d); })
                    .attr("y", function(d, i) {return height - widthScale(d) })
                    .attr("x", function(d, i) {return 100 + (i*120)}); 
                    //.attr("fill", function(d) {return color(d)});

    canvas.append("g")
    	.attr("transform", "translate(100, 0)")
    	.call(yAxis);






  
  	//canvas.append('text').text(label).attr("x", 30).attr("y", 100).attr("fill", "white").style("font-size", "100px");

}


