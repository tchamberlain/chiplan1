
  //------------------------------------------------------//
 //----------------------- home ROUTES ------------------//
//------------------------------------------------------//

Router.route('/', function(){
  //reset all global variables
    nullGlobals();
  //render home template
  this.render('home');
},{name: 'home'});

Router.configure({
  layoutTemplate: 'main'
});


  //------------------------------------------------------//
 //------------------ home INITIALIZATION ---------------//
//------------------------------------------------------//
Template.home.onCreated(function(){
  // check if user is on mobile device
  isOnMobile();
});

Template.home.onRendered(function(){
  //initialize semantic ui check box/ dropdown for mobile
  $('.ui.dropdown').dropdown();
  this.$('.checkbox').checkbox();
  //set weekend as the default
  if(!isMobile){
    this.$('#weekend').checkbox('check');
  }

  //setting hasSwiped to false if no one is logged in, if not, check if they've swiped first
  if(Meteor.user()){
    hasSwiped=Meteor.user().profile.hasSwiped;
  }
  else{
    hasSwiped=false;
  }
  
});

  //------------------------------------------------------//
 //------------------ home HELPERS ----------------------//
//------------------------------------------------------//
Template.home.helpers({
  'get_next_event': function(){
    next_event=findNextEvent();
    //if the event exists return it's title
    if(next_event){
      //only want first part of the title to display
          next_event=next_event.title.substring(0,18)+"...";
          return next_event;
      }
      else{
       return 0;
      }
    }
});

  //------------------------------------------------------//
 //------------------ home EVENTS ----------------------//
//------------------------------------------------------//
Template.home.events({
    'click #next_event': function(){
      Session.set('actInfoEvent',findNextEvent());
      Router.go('actInfo',{_id: findNextEvent()._id,isInvite:[0]} );
    },
   'click #create': function(){
    if(Meteor.user()){
      Router.go('createEvent');
    }
    else{
      alert("You must log in to create an event");
    }
      
    },    
    'click #category': function(evt, temp){
       var category=""+($(evt.target).closest('img').data('value'));
       //get the category the user clicked on, then build a list of events with that category
      set_up_deck(category);
    },

 });

  //------------------------------------------------------//
 //------------------ home FUNCTIONS --------------------//
//------------------------------------------------------//
function get_search(){
  //date search
    if ($("#tomorrow").checkbox('is checked')){ date="tomorrow"}
    else if ($("#today").checkbox('is checked')){date="today"}
    else if ($("#week").checkbox('is checked')){date="week"}
    else if ($("#weekend").checkbox('is checked')){date="weekend"}
    else if (($("#date_dropdown").dropdown('get text'))=="Tomorrow"){date="tomorrow"}
    else if (($("#date_dropdown").dropdown('get text'))=="Today"){date="today"}
    else if (($("#date_dropdown").dropdown('get text'))=="This week"){date="week"}
    else if (($("#date_dropdown").dropdown('get text'))=="This weekend"){date="weekend"}
    else{date="any_date"}


  //distance search
  if ($("#five_mi").checkbox('is checked')){dist="five"}
  else if ($("#ten_mi").checkbox('is checked')){dist="ten"}
  else if (($("#dist_dropdown").dropdown('get text'))=="Within five miles"){dist="five"}
  else if (($("#dist_dropdown").dropdown('get text'))=="Within ten miles"){dist="ten"}
  else{dist="any_dist"}

  search=[date, dist];
  return(search)
}

set_up_deck=function(category){

       //ADD THIS LATER !!!!!
      //if user DOES NOT have location, disable distance search 

      //get user's input parameters
      search=get_search();
      Globals.searchParams={category: category, date: search[0], distance: search[1]};
      Router.go('eventsTemp',{category: category, date: search[0], distance: search[1]})
  }


 // get and sort all of user's favorites in order to return the one closest in time
function findNextEvent(){
  if((Meteor.user())&&(Meteor.user().profile.favorites.length)){
    favorites=Meteor.user().profile.favorites; 
    next_event= favorites[0]
    for(i=1; i<favorites.length; i++){
      if(favorites[i].start_date<next_event.start_date){
        next_event=favorites[i];
      }
    }
    //set the next event as a session variable
    Session.set('next_event',next_event)

    return next_event;
  }
  //if user isn't logged in, or they have no favorites, return 0
  else{
    return 0;
  }
}

//clear global variables every time you reach the home page, for a new users search
nullGlobals=function(){
    Globals.eventList=null;
    Globals.seeAllEventList=null;
    Globals.eventIndex=0;
    Globals.currentEvent=null;
    Globals.searchParams=null;
    Session.set('currentEvent',null);
}




