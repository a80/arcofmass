//reference to the database

//don't pull data from the server yet. 
Template.newFeature.rendered = function () {
    var graph;
    graph = new myGraph("#barChart");


    //there is a Deps.autorun package that updates data dynamically.
}

Template.newFeature.helpers({

    simpleArray: function() {
      return [1, 2, 3]; 
    },

    currentElement: function() {
      console.log(this);
    }

});

function myGraph(el) {

  //paragraph works. 
  /*d3.select(el)
    .append("p")
    .style("color", "red")
    .text("hi, what's up?");*/

  var dataArray = [50];

  var width = 500; 
  var height = 500;

  var widthScale = d3.scale.linear()
                      .domain([0, 60])
                      .range([0, width]); 

  var color = d3.scale.linear()
                .domain([0, 60])
                .range(["red", "blue"]);


  var canvas = d3.select(el)
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height); 

  var bars = canvas.selectAll("rect")
                    .data(dataArray)
                    .enter()
                      .append("rect")
                      .attr("width", width)
                      .attr("height", function (d) { return widthScale(d); })
                      .attr("y", function(d, i) {return i*100; })
                      .attr("fill", function(d) {return color(d)});

  /*var circle = canvas.append("circle")
                      .attr("cx", 50)
                      .attr("cy", 50)
                      .attr("r", 50)
                      .attr("fill", "red");

  var rect = canvas.append("rect")
                    .attr("width", 100)
                    .attr("height", 50); */

}

