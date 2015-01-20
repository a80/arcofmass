

//routing logic 
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {

  //REMOVE:

  this.route('newFeature', {path: '/new'}); 
  //this.route('removeFeature', {path: '/remove'});

  this.route('login', {path: '/'});

  this.route('adminLogin', {path: '/admin-login'});



  this.route('profileHome', {path: '/profile',
  	onBeforeAction: function() {
  		user = Meteor.user()._id; 
  		if (!Roles.userIsInRole(user, ['regular'])) {
  			this.redirect('login');
  			this.stop(); 
  		}
  		this.next(); 
  		return true; 
  	},

    
  }); //insert User ID

  this.route('user-settings', {path: '/user-settings',
  	onBeforeAction: function() {
  		user = Meteor.user()._id; 
  		if (!Roles.userIsInRole(user, ['regular'])) {
  			this.redirect('login');
  			this.stop(); 
  		}
  		this.next(); 
  		return true; 
  	}
  }); //insert Admin ID
  //this.route('adminUpdate', {path: '/update'}); //insert Admin ID

  this.route('adminHome', {path: '/admin', 
  	onBeforeAction: function() {
  		user = Meteor.user()._id; 
  		console.log(user.username);
  		if (!Roles.userIsInRole(user, ['admin'])) {
  			this.redirect('login');
  			this.stop(); 
  		}
  		this.next(); 
  		return true; 
  	}
  }); //insert Admin ID

  this.route('adminUpdate', {path: '/update', 
  	onBeforeAction: function() {
  		user = Meteor.user()._id; 
  		//console.log(user.username);
  		if (!Roles.userIsInRole(user, ['admin'])) {
  			console.log(user.username);
        this.redirect('login');
  			this.stop(); 
  		}
  		this.next(); 
  	}
  }); //insert Admin ID

   this.route('adminRegion', {path: '/region', 
    onBeforeAction: function() {
      user = Meteor.user()._id; 
      //console.log(user.username);
      if (!Roles.userIsInRole(user, ['admin'])) {
        this.redirect('login');
        this.stop(); 
      }
      this.next(); 
    }
  });

});
