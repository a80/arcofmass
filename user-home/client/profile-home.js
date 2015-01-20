Template.profileHome.events({
	'click #user-settings-button': function() {
    Router.go('/user-settings');
  },
});

Template.profileHome.helpers({
	getUserIssues: function() {
		console.log(issues.find({}).fetch());
		return issues.find({}); 
	},

	returnUserId: function() {
		return Meteor.user().username; 
	},
});
	 
Template.toDoPanel.helpers({
	returnToDos: function(issue) {
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

//delete this. 
Template.toDoPanel.events({
	"click .toggle-checked": function () {
      //set the checked property to the opposite of its current value
      //Tasks.update(this._id, {$set: {checked: ! this.checked}}); 

      //replace with: 
      //dataArray[0] += 20; 
      var issue = issues.findOne({name: "Mafirstissue"});

      var prevCount = issue.count;

      //issue.count += 1;
      Meteor.call("increaseIssueCount", "Mafirstissue"); 

      var newCount = issues.findOne({name: "Mafirstissue"}).count;

      console.log("incremented from: " + prevCount + "to " + newCount);



      //re-render the graph. this is automatically taken care of when dependencies change?

    },

});

Template.profileHome.rendered = function() {

	/*var width = 500; 
  	var height = 500;

  	var widthScale = d3.scale.linear()
                      .domain([0, 10])
                      .range([0, width]); 

  	var color = d3.scale.linear()
                .domain([0, 60])
                .range(["red", "blue"]);

  	var canvas = d3.select("#barChart")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height); 

  	var bars = canvas.data([2])
                    .enter()
                      .append("rect")
                      .attr("width", width)
                      .attr("height", function (d) { return widthScale(d); })
                      .attr("y", function(d, i) {return i*100; })
                      .attr("fill", function(d) {return color(d)});*/

 	var graph;

 	//var issueList = issues.find({}).fetch();
	
	//graph = progressBar("#barChart");
	 

	Deps.autorun(function() {
		//var count = issues.findOne({name: "Mafirstissue"}).count;
		//console.log(count); 
		//console.log(issueList[0].count); 


		//attempting to update the chart automatically. 
		var issueList = issues.find({}).fetch();
		graph = progressBar("#barChart", issueList);



		//trying different methods. 
		/*if (graph) {
			graph.draw("#barChart", issueList);
		}*/
		
		/*var newCount = issueList[0].count; 

		var widthScale = d3.scale.linear()
                      .domain([0, 10])
                      .range([0, width]);

        d3.select("#barChart").select("svg").selectAll("rect").data([newCount])
        	.enter()
        	.attr("height", function (d) { return widthScale(d); });*/

        console.log("chart attempting to rerender");
	});



}


/*var updateChartData = function(data) {
	var widthScale = d3.scale.linear()
                      .domain([0, 10])
                      .range([0, width]); 

	var svg = d3.select("svg").select("rect").data(data)
				.attr("height", function (d) { return widthScale(d); })

}*/

//var dataArray = [10];
//Template.issuePanel.progressBar = function() {



function progressBar(el, data) {
	var self = this;
	var canvas; 

  	var width = 500; 
  	var height = 500;

  	var widthScale = d3.scale.linear()
                      .domain([0, 10])
                      .range([0, width]); 

  	var color = d3.scale.linear()
                .domain([0, 10])
                .range(["red", "blue"]);


    var createCanvasSvg = function(el) {
    	canvas = d3.select(el)
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);
    }

    createCanvasSvg(el);


  	/*var canvas = d3.select(el)
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height); */

    /*self.clear = function(el) {
    	d3.select('svg').remove(); 
    	createCanvasSvg(el); 
    }

    self.draw = function(el, data) {
    	self.clear(el);
    	//return; 

    	if (canvas) {
    		canvas.selectAll("rect")
                .data([data[0].count])
                .enter()
                    .append("rect")
                    .attr("width", width)
                    .attr("height", function (d) { return widthScale(d); })
                    .attr("y", function(d, i) {return i*100; })
                   	.attr("fill", function(d) {return color(d)});
    	}
    }*/

  	var bars = canvas.selectAll("rect")
                    .data([data[0].count])
                    .enter()
                      .append("rect")
                      .attr("width", width)
                      .attr("height", function (d) { return widthScale(d); })
                      .attr("y", function(d, i) {return i*100; })
                      .attr("fill", function(d) {return color(d)});


}