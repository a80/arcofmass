Template.adminRegion.events({
	"click #logoutButton": function(event) {
			Meteor.logout();
		},
	"click #admin-home-button": function(event) {
		Router.go("/admin"); 
	},

	"click #update-button": function(event) {
		Router.go("/update"); 
	}
});

Template.adminRegion.helpers({
	returnUserId: function() {
		return Meteor.user().username; 
	},
});
/*
Template.adminRegion.barChart = function() {

	var widthScale = d3.scale.linear()
						  .domain([0, 60])
						  .range([0, 500]);

	var color = d3.scale.linear()
					.domain([0, 60])
					.range(["red", "blue"]);

	var axis = d3.svg.axis()
					.ticks(5)
					.scale(widthScale); 

	var data = [10,20,30,40]

	d3.select(".chart")
	  .selectAll("div")
	.data(data)
	  .enter().append("div")
	  .style("height", function(d) { return d * 10 + "px"; })
	  .text(function(d) { return d; });

}

*/