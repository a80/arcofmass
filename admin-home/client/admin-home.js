Meteor.subscribe("adminHomeAllUsers");
Meteor.subscribe("adminHomeDistricts");


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
	}, 


	issuesExist: function(){
		//console.log()
		if ((issues.find({}).fetch()).length !=0){
			return true;
		}
		return false;
	}



});

Template.adminIssueListView.helpers({
	getUserIssues: function() {
		return issues.find({});  
	},
})

Template.adminIssuePanel.helpers({
	returnIssueName: function() {
		return this.name;
	}, 
	/*returnIssueCount: function() {
		return this.count; 
	},*/ 

	returnToDos: function(issue) {
		var issueName = this.name;
		var actionItemsForIssue = [];

		actionItemsData = actionItems.find({}).fetch();

		for (var i = 0; i < actionItemsData.length; i++) {
		  //console.log("entered if loop"); 
		  if (actionItemsData[i].issue === issueName) {
			var toDo = actionItemsData[i];
			var percent = parseInt((toDo.count / parseInt(toDo.goal))*100);
			var output ='';
			if (percent < 100)
				output = String(toDo.text + ": " + toDo.count + "/" + parseInt(toDo.goal) + " (" + percent + "%" + ")");
			else
				output = String(toDo.text + ": " + toDo.count + "/" + parseInt(toDo.goal) + " (" + percent + "%" + ") - Goal Achieved!");
			actionItemsForIssue.push(output); 
		  }
		}

      	return actionItemsForIssue; 
	}, 

	returnToDoName: function() {
		
		return this; 
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


Template.adminIssueGraphView.helpers({
	graphViewShowIssueList: function() {
		if (Session.get("graphViewShowIssues") === undefined) {
			return true; 
		} else {
			return Session.get("graphViewShowIssues"); 
		}
	}

});

Template.adminIssueGraphView.events({
	"click #toggleIssueList": function() {
		Session.set("graphViewShowIssues", true);
	},
	"click #toggleDistrictList": function() {
		Session.set("graphViewShowIssues", false);
	}
}); 


//within graph view, the issue list: 
Template.graphViewIssueList.helpers({
	getUserIssues: function() {
		return issues.find({});  
	},
	returnIssueName: function() {
    return this.name;
  },
}); 

Template.graphViewIssueList.events({
	"click .list-group-item": function(event, template){

		var array; 



			if (template.find(".active") === null) {
				$(event.target).addClass('active');
				$(event.target).addClass('activeItem');
			} else {

				template.find(".activeItem").classList.remove("active"); 
				template.find(".activeItem").classList.remove("activeItem");
				$(event.target).addClass('active');
				$(event.target).addClass('activeItem');
			}
			
			selectedIssueInList = $(".activeItem").text();
			//console.log("selected:" + selectedIssueInList);
			Session.set("adminSelectedIssueGraphView", selectedIssueInList); 
			//console.log(Session.get("adminSelectedIssueGraphView"));

			//now need to rerender the graph.
			//get the data needed. 

			var result = [];
 			var filteredUsersByIssue = Meteor.users.find({"profile.issues": {$in: [selectedIssueInList]}}).fetch(); 

    		//console.log(filteredUsersByIssue); 

    		for (var i = 0; i < filteredUsersByIssue.length; i++) {
      			var user = filteredUsersByIssue[i]; 
      			//console.log("this is user: " + user); 
      			if (result[user.profile.district] == null) {
        			result[user.profile.district] = 1;
      			} else {
        			result[user.profile.district] += 1;
      			}
    		}

    		//console.log(" this is the result: ", result);

    		var keyNames = []; 
			var values = []; 

			/*for (var key in result) {
				keyNames.push(key); 
				values.push(result[key]); 
			}*/ 

			/*for (var j = 0; j < 5; j++) {
				console.log(sortedKeys[10]); 
			}*/


			var sortedKeys = Object.keys(result).sort(function(a,b){return result[b]-result[a]});

			//console.log(sortedKeys);

			//console.log(sortedKeys[10]); 

			for (var j = 0; j < 5; j++) {
				if (sortedKeys[j] != undefined) {
					keyNames.push(sortedKeys[j]); 
					values.push(result[sortedKeys[j]]);
				}
			}

			//console.log(keyNames, values); 

    		//put list in order and only give it keys.  

    		graph = progressBar(".adminHomeGraphDiv", [keyNames, values]);
    		//return result;


			/*Meteor.call("getDistrictsByIssue", selectedIssueInList, function(error, result) {
				if (!error) {
					console.log(result); 
					console.log(result); 
					array = result; 
					//graph = progressBar(".adminHomeGraphDiv", 10, "what: ");
				}
			}); 
			console.log(array); */

		}

}); 

var graph; 

//adding graphs to adminHome

Template.adminIssueGraphView.rendered = function() {

	Deps.autorun(function() {
      graph = nothingSelected(".adminHomeGraphDiv");

	});
}

function nothingSelected(el) {

 	var self = this;
	var canvas; 

  	var width = 600; 
  	var height = 600;

  	var createCanvasSvg = function(el) {
      d3.select(el)
        .selectAll("svg")
        .remove();
        
      	canvas = d3.select(el)
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                  .append("g"); 
  }

  	createCanvasSvg(el);


  	canvas.append('text').text("Select an issue or district.").attr("x", 30).attr("y", 100).attr("fill", "white").style("font-size", "50px");
  	canvas.append('text').text("View top 5 stats.").attr("x", 30).attr("y", 150).attr("fill", "white").style("font-size", "30px");
}

function progressBar(el, keysAndValues) {

	//parse the dict. 
	/*var keys = []; 
	var values = []; 

	for (var key in dict) {
		keys.push(key); 
		values.push(dict[key]); 
	}*/

	var keys = keysAndValues[0]; 
	var values = keysAndValues[1];

	//console.log("in graph", keys, values); 



	//console.log(keys, values);

 	var self = this;
	var canvas; 

  	var width = 1000; 
  	var height = 600;

  	var widthScale = d3.scale.linear()
                      .domain([0, (Math.max.apply(Math, values))])
                      .range([0, 0.9*height]); 

  	var color = d3.scale.linear()
                .domain([0, 10])
                .range(["red", "blue"]);

    var yAxis = d3.svg.axis()
    				.scale(d3.scale.linear().domain([0, Math.max.apply(Math, values)]).range([0.9*height, 0]))
    				.orient("left")
    				.ticks(5)
    				 .tickFormat(d3.format("d")); 

    yAxis.integersOnly = true; 

    var xAxis = d3.svg.axis()
    				.scale(d3.scale.ordinal().domain(keys).rangePoints([0, 175*keys.length], 0.9))
    				.orient("bottom"); 


  	var createCanvasSvg = function(el) {
      d3.select(el)
        .selectAll("svg")
        .remove();
        
      	canvas = d3.select(el)
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                  .append("g"); 
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
                  .data(values)
                  .enter()
                    .append("rect")
                    .attr("y", 600)
                    .attr("width", 100)
                    .attr("fill", "orange")
                    .transition()
                    .duration(1000)
                    .attr("height", function (d) { return widthScale(d); })
                    .attr("y", function(d, i) {return (0.9*height) - widthScale(d) })
                    .attr("x", function(d, i) {return 80 + (i*180)}); 
                    //.attr("fill", function(d) {return color(d)});

    canvas.append("g")
    	.attr("transform", "translate(50, 6)")
    	.attr("class", "axis")
    	.call(yAxis);

    canvas.append("g")
    	.attr("transform", "translate(50, 540)")
    	.attr("class", "axis")
    	.call(xAxis);

    canvas.append("text")
    .attr("class", "ylabel")
    .attr("text-anchor", "end")
    .attr("y", 0)
    .attr("x", -150)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Number of user constituents");



    svg.append("text")
    .attr("class", "xlabel")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("income per capita, inflation-adjusted (dollars)");

  	//canvas.append('text').text(label).attr("x", 30).attr("y", 100).attr("fill", "white").style("font-size", "100px");

}

//for graph view district list. 

Template.graphViewDistrictList.helpers({
	getDistricts: function() {
		return districts.find({}).fetch(); 
	}, 
	returnDistrictName: function() {
		return this.name; 
	}
}); 

Template.graphViewDistrictList.events({
	"click .list-group-item": function(event, template){

		var array; 

			if (template.find(".active") === null) {
				$(event.target).addClass('active');
				$(event.target).addClass('activeItem');
			} else {

				template.find(".activeItem").classList.remove("active"); 
				template.find(".activeItem").classList.remove("activeItem");
				$(event.target).addClass('active');
				$(event.target).addClass('activeItem');
			}
			
			selectedDistrictInList = $(".activeItem").text();
			//console.log("selected:" + selectedDistrictInList);
			Session.set("adminSelectedDistrictGraphView", selectedDistrictInList); 
			//console.log(Session.get("adminSelectedDistrictGraphView"));

			//now need to rerender the graph.
			//get the data needed. 

			var result = [];
 			var filteredUsersByDistrict = Meteor.users.find({"profile.district": selectedDistrictInList}).fetch(); 

 			//console.log("here"); 

    		//console.log(filteredUsersByDistrict); 

    		for (var i = 0; i < filteredUsersByDistrict.length; i++) {
      			var user = filteredUsersByDistrict[i]; 
      			var userIssues = user.profile.issues; 
      			//console.log("this is user: " + user);

      			for (var j = 0; j < userIssues.length; j++) {
      				var issue = userIssues[j]; 
      				if (result[issue] == null) {
						result[issue] = 1;
					} else {
						result[issue] += 1;
					}
      			} 
    		}


    		var keyNames = []; 
			var values = []; 

			var sortedKeys = Object.keys(result).sort(function(a,b){return result[b]-result[a]});

			for (var j = 0; j < 5; j++) {
				if (sortedKeys[j] != undefined) {
					keyNames.push(sortedKeys[j]); 
					values.push(result[sortedKeys[j]]);
				}
			}

			//console.log(keyNames, values); 

    		graph = progressBar(".adminHomeGraphDiv", [keyNames, values]);
		},

}); 


