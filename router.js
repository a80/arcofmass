//routing logic 
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('login', {path: '/'});
  this.route('profileHome', {path: '/profile'}); //insert User ID
  this.route('adminHome', {path: '/admin'}); //insert Admin ID
  this.route('user-settings', {path: '/user-settings'}); //insert Admin ID
});
