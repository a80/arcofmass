//reference to the database

//don't pull data from the server yet. 

if (Meteor.isClient) {
  Template.newFeature.rendered = function () {
    var graph;
    graph = new myGraph("#barChart");


    //there is a Deps.autorun package that updates data dynamically.
  };

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

  var dataArray = [20, 40, 50];


  var canvas = d3.select(el)
                  .append("svg")
                  .attr("width", 500)
                  .attr("height", 300); 

  var bars = canvas.selectAll("rect")
                    .data(dataArray)
                    .enter()
                      .append("rect")
                      .attr("width", function (d) { return d; })
                      .attr("height", 50)
                      .attr("y", function(d, i) {return i*100; }); 

  /*var circle = canvas.append("circle")
                      .attr("cx", 50)
                      .attr("cy", 50)
                      .attr("r", 50)
                      .attr("fill", "red");

  var rect = canvas.append("rect")
                    .attr("width", 100)
                    .attr("height", 50); */

}
}

