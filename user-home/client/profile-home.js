Meteor.subscribe("userHomeIssues");
Meteor.subscribe("userNotifications");
Meteor.subscribe("allUsers");
// notifications = new Mongo.Collection("notifications");
//profileHome

Template.profileHome.events({
	"click #logoutButton": function(event) {
			Meteor.logout();
			Router.go("/");
		},

	'click #user-settings-button': function() {
    Router.go('/user-settings');
  },
  'click #toggle-navigation-button': function() {
    alert();
  },
  
});


Template.profileHome.helpers({
	getUserIssues: function() {
  var list = issues.find({name: {$in: Meteor.user().profile.issues}}).fetch();

	return _.map(list, function(l) {
    	_.extend(l, {graphID: l.name.replace(/\s*/g, '')});
      	return l;
    	}); 
	},

	returnUserId: function() {
		return Meteor.user().username; 
	},

  
  returnInspiration: function() {
    try {
      insp = Meteor.user().profile.inspiration;
      
      if (insp != null && insp != "") {
        return insp;
      } else {
        return "Someone";
      }
    } catch(e) {
      return "Someone";
    }
  },

  showMyNotifications: function() {
    if (Session.get("showMyNotifications") === undefined) {
      return true; 
    } else {
      return Session.get("showMyNotifications"); 
    }
  }, 

  returnSectionId: function() {
    return this._id + "section"; 
  },
});


//myChangeListItem

Template.myChangeListItem.helpers({
  notificationTask: function() {
    var toDoId = this.toDoId; 
    return actionItems.findOne({_id: toDoId}).text; 
  }, 
  notificationIssue: function() {
    var toDoId = this.toDoId; 
    return actionItems.findOne({_id: toDoId}).issue; 
  }, 
  dateOfNotification: function() {
    return moment(this.dateCompleted).format('MMMM Do YYYY, h:mm:ss a');
  }
});


//issuePanel

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
	 

//toDoPanel   

Template.toDoPanel.helpers({
	returnToDos: function(issue) {
		var issueName = this.name;
		var actionItemsForIssue = [];

		actionItemsData = actionItems.find({}).fetch();

		for (var i = 0; i < actionItemsData.length; i++) {
		  if (actionItemsData[i].issue === issueName) {
			actionItemsForIssue.push(actionItemsData[i]); 
		  }
		}

		_.map(actionItemsForIssue, function(a) {
      _.extend(a, {toDoID: a._id}); });

    _.map(actionItemsForIssue, function(a) {
      _.extend(a, {toDoCheckID: a._id + "check"}); }); //change this.

    return actionItemsForIssue; 
	}, 

	returnToDoName: function() {
		return this.text; 
	}, 

  checked: function() {
    userId = Meteor.user()._id;
    foundNotification = notifications.findOne({userId: userId, toDoId: this._id}); 

    //console.log("userId: " + userId);
    //console.log("toDoId: " + this._id);
    //console.log(foundNotification);

    if (foundNotification != undefined) {
      return true; 
    } else {
      return false; 
    }

  },
});


Template.toDoPanel.events({
	"click .toggle-checked": function (event) {
      var idOfElement = this._id + "check"; 
      //console.log(document.getElementById(idOfElement).checked); 
      var toDoName = actionItems.findOne({_id: this._id}).text; 
      var issueOfInterest = this.issue;
      var issueId = issues.findOne({name: this.issue})._dbid; 
      //console.log("issueId: " + issueId); 
      var toDoId = this._id; 
      //console.log(issueOfInterest);  


      if (document.getElementById(idOfElement).checked) {
        //console.log("adding notification, incrementing");
        //add notification, increment
        Meteor.call("increaseToDoCount", toDoName, function(error) {
          if (!error) {
            Meteor.call("insertNotification", toDoId, issueId, function(error) {
              if (!error) {
                var graphIDtoChange = issueOfInterest.replace(/\s*/g, ''); 
                graphs[graphIDtoChange] = progressBar("#" + graphIDtoChange, actionItems.findOne({_id: toDoId}).count, "to do: " + toDoName);
              }
            });
          }
        }); 
      } else {
        //console.log("deleting notification, decrementing");
        //remove notification, decrement.
        Meteor.call("decreaseToDoCount", toDoName, function(error) {
          if (!error) {
            Meteor.call("deleteNotification", toDoId, function(error) {
              if (!error) {
                var graphIDtoChange = issueOfInterest.replace(/\s*/g, ''); 
                graphs[graphIDtoChange] = progressBar("#" + graphIDtoChange, actionItems.findOne({_id: toDoId}).count, "to do: " + toDoName);
              }
            });
          }
        }); 
      }

      
    },

    "click .toDoListItemText": function(event) {
      //select the link corresponding to the list element, display that issue. 
    	//retrieve id
    	var toDoListItemID = event.currentTarget.id;
    	var toDoOfInterest = actionItems.findOne({_id: toDoListItemID});


      //construct a dict. 
      var inputNotifParam = []; 

      var filteredNotifications = notifications.find({toDoId: toDoListItemID}, {sort: {dateCompleted: -1}, limit: 3}).fetch();
      //console.log(filteredNotifications); 

      for (var i = 0; i < filteredNotifications.length; i++) {
        var notifOfInterest = filteredNotifications[i]; 
        //console.log(Meteor.users.find().fetch()); 
        var username = Meteor.users.findOne({_id: notifOfInterest.userId}).username; 
        var timeElapsed = moment(notifOfInterest.dateCompleted).fromNow(); 
        //console.log(username, timeElapsed); 
        inputNotifParam[username] = timeElapsed; 
      } 

    	var graphIDtoChange = this.issue.replace(/\s*/g, ''); 
    	graphs[graphIDtoChange] = progressBar("#" + graphIDtoChange, toDoOfInterest.count, "to Do: " + this.text, inputNotifParam);
    },

});

var graphs = {};

Template.profileHome.rendered = function() {



	Deps.autorun(function() {
	  var issueList = issues.find({}).fetch();
    //var notifications = notifications.find({issueId: this._id}, {sort: {dateCompleted: -1}, limit: 3}); 

    //console.log(notifications); 
    
    _.each(issueList, function(issue) {
      var graphID = issue.name.replace(/\s*/g, '');
      graphs[graphID] = progressBar("#" + graphID, issue.count, "what: " + issue.name, "");
    }); 
	});

  //how to vary other elements in progressBar based on function arguments. 

}


function progressBar(el, data, label, notifications) {
  //parse input notif. param:
  //parse the dict. 
  var keys = []; 
  var values = []; 

  for (var key in notifications) {
    keys.push(key); 
    values.push(notifications[key]); 
  } 

  //console.log(keys, values);


	var self = this;
	var canvas; 

  var width = 950; 
  var height = 600;

  var widthScale = d3.scale.linear()
                      .domain([0, 20])
                      .range([0, width]); 

  var color = d3.scale.linear()
                .domain([0, 10])
                .range(["red", "blue"]);


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

  var bars = canvas.selectAll("rect")
                  .data([data])
                  .enter()
                    .append("rect")
                    .attr("y", 600)
                    .attr("width", width)
                    .attr("fill", "orange")
                    .transition()
                    .duration(1000)
                    .attr("height", function (d) { return widthScale(d); })
                    .attr("y", function(d, i) {return height - widthScale(d) }); 
                    /*.attr("fill", function(d) {return color(d)});*/

  /*console.log(issueName); */
  /*if (showNotifications) {
    canvas.append('text').text("[username] completed [todo] [min ago]").attr("x", 30).attr("y", 450).attr("fill", "white").style("font-size", "30px");
    canvas.append('text').text("[username] completed [todo] [min ago]").attr("x", 30).attr("y", 490).attr("fill", "white").style("font-size", "30px");
    canvas.append('text').text("[username] completed [todo] [min ago]").attr("x", 30).attr("y", 530).attr("fill", "white").style("font-size", "30px");
  } else {

  } */
  
  canvas.append('text').text(label).attr("x", 30).attr("y", 100).attr("fill", "white").style("font-size", "100px");

  canvas.append('text').text('legislator: [put name]').attr("x", 30).attr("y", 250).attr("fill", "black").style("font-size", "40px");
  canvas.append('text').text('phone: [put]').attr("x", 30).attr("y", 300).attr("fill", "black").style("font-size", "40px");
  canvas.append('text').text('email: [put]').attr("x", 30).attr("y", 350).attr("fill", "black").style("font-size", "40px");

  //selectively display notifications. 
  if (keys[0] != undefined) {
    canvas.append('text').text(keys[0] + " completed " + values[0] + ".").attr("x", 30).attr("y", 450).attr("fill", "white").style("font-size", "30px");
  }

  if (keys[1] != undefined) {
    canvas.append('text').text(keys[1] + " completed " + values[1] + ".").attr("x", 30).attr("y", 490).attr("fill", "white").style("font-size", "30px");
  }
  
  if (keys[2] != undefined) {
    canvas.append('text').text(keys[2] + " completed " + values[2] + ".").attr("x", 30).attr("y", 530).attr("fill", "white").style("font-size", "30px");
  }
  

}

Template.myNotificationsList.helpers({
  returnNotifications: function() {
    //return notifications from most recent to oldest.
    return notifications.find({userId: Meteor.user()._id}, {sort: {dateCompleted: -1}}); 
  }, 
})

Template.inspiration.helpers({
  inspirationName: function() {
    return Session.get("selectedInspiration");
  }, 
  otherUserName: function() {
    var selInspiration = Session.get("selectedInspiration"); 
    var otherUserId = inspirations.findOne({userId: Meteor.user()._id, changeFor: selInspiration}).changeForUserId; 
    return Meteor.users.findOne({_id: otherUserId}).profile.name; 
  },
  returnStory: function() {
    var selInspiration = Session.get("selectedInspiration"); 
    var otherUserId = inspirations.findOne({userId: Meteor.user()._id, changeFor: selInspiration}).changeForUserId; 
    return Meteor.users.findOne({_id: otherUserId}).profile.story; 
  },
}); 
