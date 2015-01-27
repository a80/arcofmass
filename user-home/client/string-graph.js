Meteor.subscribe("getUserInspirations"); 
Meteor.subscribe("getHelped"); 


/*function stringGraph(el) {
  this.selectedNode = null;
  var graph = this;

  $(el).on('click', 'g.node', function (e) {
    var node = this;
    graph.selectedNode = d3.select(node).data()[0].name;
    console.log(d3.select(node).data()[0].id);
    Session.set("showMyNotifications", false); 
    update();
  });

  this.addNode = function (id) {
    nodes.push({"id":id});
    update();
  };

  this.removeNode = function (id) {
    var i = 0;
    var n = findNode(id);
    while (i < links.length) {
      if ((links[i]['userName'] == n)||(links[i]['changeFor'] == n))
        {
          links.splice(i,1);
        }
        else i++;
    }
    nodes.splice(findNodeIndex(id),1);
    update();
  };

  this.removeLink = function (id){
    for(var i=0;i<links.length;i++)
    {
      if(links[i].id === id)
        {
          links.splice(i,1);
          break;
        }
    }
    update();
  };

  this.removeallLinks = function(){
    links.splice(0,links.length);
    update();
  };

  this.removeAllNodes = function(){
    nodes.splice(0,links.length);
    update();
  };

  this.addLink = function (id, userName, changeFor, value) {
    links.push({id: id, "userName":findNode(userName),"changeFor":findNode(changeFor),"value":value});
    update();
  };

  var findNode = function(id) {
    for (var i in nodes) {
      if (nodes[i]["id"] === id) return nodes[i];};
  };

  var findNodeIndex = function(id) {
    for (var i=0;i<nodes.length;i++) {
      if (nodes[i].id==id){
        return i;
      }
    };
  };

  // set up the D3 visualisation in the specified element
  var w = 500,
  h = 500;
  var svg = d3.select(el)
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id","svg")
    .attr("pointer-events", "all")
    .attr("viewBox","0 0 "+w+" "+h)
    .attr("preserveAspectRatio","xMinYMid");
  var vis = svg.append('svg:g');

  var force = d3.layout.force();

  var nodes = force.nodes(), 
  links = force.links();

  // build the arrow.
  svg.append("svg:defs").selectAll("marker")
      .data(["end"])      // Different link/path types can be defined here
    .enter().append("svg:marker")    // This section adds in the arrows
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -1.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
    .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

  var update = function () {
    var link = vis.selectAll("path")
      .data(links, function(d) {
        return d.id;
      });

    link.enter().append("svg:path")
      .attr("id",function(d){return d.id;})
      .attr("class","link")
      .attr("marker-end", "url(#end)");

    link.append("title")
      .text(function(d){
        return d.value;
      });

    link.exit().remove();

    var node = vis.selectAll("g.node")
    .data(nodes, function(d) { return d.id;});

    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .call(force.drag);

    nodeEnter.append("svg:circle")
      .attr("r", 16)
      .attr("id",function(d) { return "Node;"+d.id;})
      .attr("class","nodeStrokeClass");

    nodeEnter.append("svg:text")
      .attr("class","textClass")
      .text( function(d){return d.id;}) ;

    node.exit().remove();

    force.on("tick", function() {
      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y         + ")"; });

      link.attr("d", function(d) {
          var dx = d.changeFor.x - d.userName.x,
              dy = d.changeFor.y - d.userName.y,
              dr = Math.sqrt(dx * dx + dy * dy);
          return "M" + 
              d.userName.x + "," + 
              d.userName.y + "A" + 
              dr + "," + dr + " 0 0,1 " + 
              d.changeFor.x + "," + 
              d.changeFor.y;
      });
        
    });

      // Restart the force layout.
      force
        .gravity(0.01)
        .distance(150)
        .linkDistance( 150 )
        .size([w, h])
        .start();
  };


  // Make it all go
  update();
}*/



function stringGraph(el) {
  this.selectedNode = null;
  var graph = this;

  $(el).on('click', 'g.node', function (e) {
    var node = this;
    graph.selectedNode = d3.select(node).data()[0].name;
    //console.log(d3.select(node).data()[0].id);
    Session.set("showMyNotifications", false); 
    Session.set("selectedInspiration", d3.select(node).data()[0].id); 

    if (d3.select(node).data()[0].id === Meteor.user().profile.name) {
      Session.set("showMyNotifications", true); 
    }


    update();
  });

  // Add and remove elements on the graph object
  this.addNode = function (id) {
    nodes.push({"id":id});
    update();
  };

  this.removeNode = function (id) {
    var i = 0;
    var n = findNode(id);
    while (i < links.length) {
      if ((links[i]['source'] == n)||(links[i]['target'] == n))
        {
          links.splice(i,1);
        }
        else i++;
    }
    nodes.splice(findNodeIndex(id),1);
    update();
  };

  this.removeLink = function (id){
    for(var i=0;i<links.length;i++)
    {
      if(links[i].id === id)
        {
          links.splice(i,1);
          break;
        }
    }
    update();
  };

  this.removeallLinks = function(){
    links.splice(0,links.length);
    update();
  };

  this.removeAllNodes = function(){
    nodes.splice(0,links.length);
    update();
  };

  this.addLink = function (id, source, target, value) {
    links.push({id: id, "source":findNode(source),"target":findNode(target),"value":value});
    //console.log(links);
    update();
  };

  var findNode = function(id) {
    for (var i in nodes) {
      if (nodes[i]["id"] === id) return nodes[i];};
  };

  var findNodeIndex = function(id) {
    for (var i=0;i<nodes.length;i++) {
      if (nodes[i].id==id){
        return i;
      }
    };
  };

  // set up the D3 visualisation in the specified element
  var w = 700,
  h = 400;
  var svg = d3.select(el)
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id","svg")
    .attr("pointer-events", "all")
    .attr("viewBox","0 0 "+w+" "+h)
    .attr("perserveAspectRatio","xMinYMid");
  var vis = svg.append('svg:g');

  var force = d3.layout.force();

  var nodes = force.nodes(),
  links = force.links();

  // build the arrow.
  svg.append("svg:defs").selectAll("marker")
      .data(["end"])      // Different link/path types can be defined here
    .enter().append("svg:marker")    // This section adds in the arrows
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -1.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
    .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

  var update = function () {
    var link = vis.selectAll("path")
      .data(links, function(d) {
        return d.id;
      });

    link.enter().append("svg:path")
      .attr("id",function(d){return d.id;})
      .attr("class","link")
      .attr("marker-end", "url(#end)");

    link.append("title")
      .text(function(d){
        return d.value;
      });

    link.exit().remove();

    var node = vis.selectAll("g.node")
    .data(nodes, function(d) { return d.id;});

    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .call(force.drag);

    nodeEnter.append("svg:circle")
      .attr("r", 30)
      .attr("id",function(d) { return "Node;"+d.id;})
      .attr("class","nodeStrokeClass");

    nodeEnter.append("svg:text")
      .attr("class","textClass")
      .text( function(d){return d.id;}) ;

    node.exit().remove();

    force.on("tick", function() {
      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y         + ")"; });

      link.attr("d", function(d) {
          var dx = d.target.x - d.source.x,
              dy = d.target.y - d.source.y,
              dr = Math.sqrt(dx * dx + dy * dy);
          return "M" + 
              d.source.x + "," + 
              d.source.y + "A" + 
              dr + "," + dr + " 0 0,1 " + 
              d.target.x + "," + 
              d.target.y;
      });
        
    });

      // Restart the force layout.
      force
        .gravity(.01)
        .distance(150)
        .linkDistance( 50 )
        .size([w, h])
        .start();
  };


  // Make it all go
  update();
}

  Template.diagram.rendered = function () {

    //console.log("Rendering..."); 
    var graph;
    graph = new stringGraph("#svgdiv");
    Deps.autorun(function() {
      //console.log(Meteor.user().profile.name); 
      graph.addNode(Meteor.user().profile.name); 
    });
    

    inspirations.find().observe({
      added: function (inspiration) {
        graph.addNode(inspiration.changeFor);
      },
      removed: function (inspiration) {
        graph.removeNode(inspiration.changeFor);
      }
    });

    helped.find().observe({
      added: function (doc) {
        graph.addLink(doc._id, doc.source, doc.target, doc.value);
      },
      removed: function (doc) {
        graph.removeLink(doc._id);
      }
    });

    /*helped.find().observe({
      added: function (help) {
        console.log(help._id, help.userName, help.changeFor, help.value); 
        graph.addLink(help._id, help.userName, help.changeFor, help.value);
      },
      removed: function (help) {
        graph.removeLink(help._id);
      }
    });*/
  };

