
  //------------------------------------------------------//
 //------------ sentInvitations ROUTES ------------------//
//------------------------------------------------------//
Template.sentInvitations.helpers({
    'getSentInvitations':function(){
        if(Meteor.user()){
            return Session.get('sentInvitations');
        }
    },
    'getIconText':function(){
        if(this.accepted){
            return "green inverted check icon";
        }
        else{
            return "black mail outline icon";
        }
    }
});

  //------------------------------------------------------//
 //------------ sentInvitations EVENTS ------------------//
//------------------------------------------------------//
Template.sentInvitations.events({
  'mouseout #removeIconSent': function(event, template){
        document.getElementById("removeIconSent").className = "ui black remove icon";

    },
    'mouseenter #removeIconSent': function(event, template){
        document.getElementById("removeIconSent").className = "ui red remove icon";

    },
    'click #removeIconSent': function(){
        console.log("you clieck remove", this._id);
        removeInvite(this._id);
    },
    //if the user clicks on an activity they can see more info about that activity after being routed to the info page
    'click #activity': function(){
         goToActInfo(this);
    }
});