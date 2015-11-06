Template.header.events({
  'click .heading': function(){
    Router.go('home');   
  },
  
  'click #dashboard': function(){
    Router.go('dashboard');   
  }
 });

