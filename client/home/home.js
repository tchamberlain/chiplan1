
  //------------------------------------------------------//
 //----------------------- home ROUTES ------------------//
//------------------------------------------------------//

Router.route('/', function(){
  //reset all global variables
    nullGlobals();
    setcategoryButtonImgURLS();
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
    },

    'getImgURL':function(categoryAndColor){
      console.log("this is working");
         console.log(categoryAndColor);
          console.log(categoryButtonImgs[categoryAndColor]);
      return categoryButtonImgs[categoryAndColor];


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

//MOUSE OVER IMAGE CHANGE SRC
    // 'mouseover #category' : function() {
    //     $(this._id).draggable();
    // }

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
//also set global variables for category button images
nullGlobals=function(){
    Globals.eventList=null;
    Globals.seeAllEventList=null;
    Globals.eventIndex=0;
    Globals.currentEvent=null;
    Globals.searchParams=null;
    Session.set('currentEvent',null);
}

setcategoryButtonImgURLS=function(){
    categoryButtonImgs={};
    categoryButtonImgs.artColor='https://lh3.googleusercontent.com/4CgfgTesp_ZcyIsQMDfS8rg2aJbFilnTUNbDfCXTH6feihpIWKYyP56yv5GZsa4f4-At2ZZOF4fLzJY6CIQ4g-wubIqOzrpUutYJJfE14uVw0fBx67O4ubwLory6diqgxLQxezg8TEljUSDSxdD7DV2puS6hI63VJPSAie4cqTSuN0TNGYYMsTPSZjjEPfG4lPaMGhZkDBml-nOpeP8UdTqPJ1rxdj_yUkljMaM2v61n4K58MYFWjWzBVp-Boa55WdkK43EejBOBkvdvYkTFYcWlgvpTVFMWD_um5msFhOOCVz42GchYJx6tSr158--Blv7h61gGR40GmZzJ9u9S9JUNMeN85qIX6fmIkcgrUuVHBkhVNMcSEAwPGDbKxLsMzU4AmKusiNONY4Hifs0s7MHsiEi34nQBsOPOp--bdZ1rxuPaZ9vuL1qDhxnZbianiAE8dNbWt6HHmdXoVVHj0TWrmJsyH3IJ_BIUnzsVZWRouQDza9dQnz_3bTw6w0Y77xUDvF5ClItRvTLcfzlIInAkCzdQM0L3P9QZWpig3ls=w253-h223-no';
    categoryButtonImgs.artBW='';
    categoryButtonImgs.entertainmentColor='https://lh3.googleusercontent.com/3gyGZY9ueQv6wWIJJWYXyyMHoP52I3Gi26lbGJC-DDtzmIRgelEZKSbgJqZSH_nJg4OAV29R8ogCa1jf-BFN7HaVSzVlDsUbNNN2UkoYZfjaJWiBkHOZQhg-8jHSUv8j-yaBaezvEL3nvZZX9dAOb6tlL6xNn_p1E02XiTEGOtsKQ1IrcLlXkTcphPHaHQAPHEGXDqWZkFfsAPA-XItgb8tUkr37tWgcapKMoi3zYksfKUgMYHBIge2JSSaHK06G0P0nAbr8W_vIVzvO0fDn5Iez2Rnfje8TS5x7esQzxx_6gmZsXRv2919WxumHpX1OMk8OHWjoadfWJyALpehMC-H2GqkjYeV7gZVxR7XaanUsnWLfm1TBkIrzLv4jWVXyUWHmbJQJDGw-ZoV48vGsijfpYokf1IaFJr_1kdLPeHD5I2OcmUtvjyU7fdY6aWA6yOmcLvVQAJvj5htESOBW22c4s0_YUGbQc-qLr9Hz3rmyPY68HM7x6zdAHUTJtX7urGcwcaQWrGjQv7PGDzWrTPBfnSt_fAA3vpxXAYf_4ow=w664-h550-no';
    categoryButtonImgs.entertainmentBW='';
    categoryButtonImgs.stayInColor="https://lh3.googleusercontent.com/oM0JnI5__0S7oW0pacvoCgNif-xhGqby02jkdam8rydWjshXcmAFcpWLY-d8DvpkePi7K6hiMO_JiGjDdCV5JbD1iZ18Rlkdg4wLaWRP8C7czng456-B25lFGUWOYLG13JwFKEqybUXsqsptuPKBZMr0pocbDFA85N5RxfXGYqdDpDa3gctdGy8UNd56qgSq0mmnaaSZkNETjKjzjMPvMXqRxATdGZhGDcKaQlFT88eAdWp-Za_iBnmpK9nuVflNYztdBSC57Wb_IEgPD2DFywPrYf8sC3gpsjfTX9xGVSenLxvuTyQXA9zFm9_cunW_ezMIUYCUPLNa1OAbxEFf8K-c4kmRN-CTyViNhCcMIflsghZ1WfZHMlWQ_2lifEIO-Xb8ewg-yisC6OPu-0zU0QWyE6M0xw54Vo4ItwTE7cVAZkebAWQ_IUtW9SD47hrPlmb8oC9ULEROYhxxQMpG8wldwimhTBDP5tTdP4BulrZ530LE_tyPm0A8Oe-0tKgpFjF2xiS2sROTJe7TfuwTOkrNY63kghDSA8RT71nvCCA=w670-h523-no";
    categoryButtonImgs.stayInBW='';
    categoryButtonImgs.sportsColor='';
    categoryButtonImgs.sportsBW='';
    categoryButtonImgs.surpriseMeColor='';
    categoryButtonImgs.surpriseMeBW='';
};





