//routing logic 
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {

  this.route('login', {path: '/'});

  this.route('adminLogin', {path: '/admin-login'});

  this.route('profileHome', {path: '/profile',
    loadingTemplate: 'profile-loading',

    waitOn: function() {
      return Meteor.subscribe('userIssues'); 
    },

    onBeforeAction: function() {
      //console.log('am i a user', Meteor.user());
      if (Meteor.user() && this.ready()) {
        user = Meteor.user()._id; 
        if (!Roles.userIsInRole(user, ['regular'])) {
          this.redirect('login');
          this.stop(); 
        } else {
          this.next();
        }
      } else {
        //console.log('you are not a user');
        this.render('profile-loading');
      }
    },

    action: function() {
      if (this.ready()) {
        this.render();
      }
    }
  });

  this.route('userSettings', {path: '/user-settings',
  	loadingTemplate: 'loading',
    onBeforeAction: function() {
      console.log('am i a user', Meteor.user());
  		if (Meteor.user()) {
        user = Meteor.user()._id; 
        if (!Roles.userIsInRole(user, ['regular'])) {
          this.redirect('login');
          this.stop(); 
        } else {
          this.next();
        }
      } else {
        console.log('you are not a user');
        this.render('loading');
      }
  	}
  }); 

  this.route('adminHome', {path: '/admin', 
  	onBeforeAction: function() {
  		user = Meteor.user()._id; 
  		console.log(user.username);
  		if (!Roles.userIsInRole(user, ['admin'])) {
  			this.redirect('login');
  			this.stop(); 
  		}
  		this.next(); 
  	}
  }); 

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
  }); 

});
