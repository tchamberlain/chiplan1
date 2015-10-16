Router.route('/dashboard',{
   waitOn: function(){
          nullGlobals();
         return[ Meteor.subscribe('getInvitations', Meteor.user()),Meteor.subscribe('getSentInvitations', Meteor.user()),Meteor.subscribe('getSubmittedEvents',Meteor.user())];
        }
  });


//when the dashboard is created we need to make lists of invites that have been declined /accepted
//also need to maje a list of facorite events??? why do you do this id stuff
Template.dashboard.onCreated( function(){ 
  acceptedInvites=[];
  declinedInvites=[];
  unseenInvites=[];
  sentInvitations= makeAcceptedLists("sent");
  invitations= makeAcceptedLists("incoming");
  submittedEvents=makeAcceptedLists("incoming", "submittedEvents");
  Session.set("sentInvitations",sentInvitations);
  Session.set("invitations",invitations);


});

Template.dashboard.helpers({
    'is_admin':function(){
        return isAdmin();
  }
});

Template.favorites.helpers({
  'get_fav_list': function(category){
        if (Meteor.user().profile.favorites.length==0)
          return false;
        return Meteor.user().profile.favorites;
  },
    'get_heart_icon': function(act_id){
          user_id=Meteor.user()._id;
          if(Meteor.users.find({_id:user_id, 'profile.discarding._id':act_id}).count()){
            return 0;
          }
          else{
            return 1;
          }
     },

     'getWhen':function(){
        return get_when(this);
     }
});

Template.favorites.events({
    //if the user clicks on an activity they can see more info about that activity after being routed to the info page
    'click #activity': function(){
         goToActInfo(this);
    },
    'click #share': function(){
      var the_id = this._id;
      Session.set('shareEvent',this);
      Router.go('share',{_id: the_id, fromEvents:0,fromYourEvents:1});
    },

    //clicking the heart button will discard the item, removing it from favorites
    'click #fav_icon': function(){
        var act_id = this._id;
        Meteor.users.update({_id: user_id}, {$addToSet: {'profile.discarding': {_id: act_id}}});
        var act_id = this._id;
        //setting time out allows user to see a red 'X' appear to activity prior to it disappearing from the favorites list
        setTimeout(function() {
            Meteor.users.update({_id: user_id}, {$pull: {'profile.discarding': {_id: act_id}}});
            Meteor.users.update({_id: user_id}, {$pull: {'profile.favorites': {_id: act_id}}});
            Meteor.users.update({_id: user_id}, {$addToSet: {'profile.discards': {_id: act_id}}});

        }, 800);

    }
});

Template.invitations.helpers({
        'isMobile':function(){
            return isMobile;
    },
    'getDeclineButtonLabel':function(){
          if(isMobile){
            return "";
        }
        else{
            if(Session.get('declinedInvites').indexOf(this._id)>-1){
                return "Declined";
            }
            else{
                return "Decline";
            }
        }
    },
    'getAcceptButtonLabel':function(){
        if(isMobile){
            return "";
        }
        else{
            if(Session.get('acceptedInvites').indexOf(this._id)>-1){
                return "Accepted";
            }
            else{
                return "Accept";
            }
        }
    },
    'getButtonText':function(){
        if(isMobile){
            return "tiny icon";
        }
        else{
            return "";
        }
    },
    'getAcceptIcon':function(){
          if(isMobile){
            return "inverted check icon";
        }
        else{
            return "";
        }
    },
    'getDeclineIcon':function(){
       if(isMobile){
            return "inverted minus icon";
        }
        else{
            return "";
        }
    },
    'isAccepted': function(){
            console.log("is acceoted",(Session.get('acceptedInvites').indexOf(this._id)>-1));
            return (Session.get('acceptedInvites').indexOf(this._id)>-1);
  },
    'isUnseen': function(){
          console.log("is unseenInvites",(Session.get('unseenInvites').indexOf(this._id)>-1));
          return (Session.get('unseenInvites').indexOf(this._id)>-1);
    },
    'isDeclined': function(){   
      console.log(this._id);
          return(Session.get('declinedInvites').indexOf(this._id)>-1);
  },
    'getInvitations':function(){
        if(Meteor.user()){
            return Session.get('invitations');
        }
    },

});

Template.invitations.events({

    'mouseout #removeIcon': function(event, template){
        document.getElementById("removeIcon").className = "ui black remove icon";

    },
    'mouseenter #removeIcon': function(event, template){
             document.getElementById("removeIcon").className = "ui red remove icon";

    },
    'click #removeIcon': function(){
        removeInvite(this._id);
    },
    //if the user clicks on an activity they can see more info about that activity after being routed to the info page
    'click #activity': function(){
         goToActInfo(this);
    },

       'click #acceptInvite': function(){
      /// update accept in invitation object
      this.accepted=true;
      acceptedInvites.push(this._id);

      console.log("admin?", isAdmin());

      //if this has been declined prior, this will remove it from the list
      if(declinedInvites.indexOf(this._id)>-1){
        declinedInvites.splice(declinedInvites.indexOf(this._id),1); 
      }
      else if(unseenInvites.indexOf(this._id)>-1){
        unseenInvites.splice(unseenInvites.indexOf(this._id),1); 
      }

       Session.set('declinedInvites',declinedInvites);
       Session.set('acceptedInvites',acceptedInvites);
       Session.set('unseenInvites',unseenInvites);
      Invitations.update({_id:this._id}, {$set:{accepted:true}});


      if(isAdmin()){
          //call insert on the object
          Activities.insert(this.activity);
          //call geocode function on the object
          geocode_update_db(this.activity);
      }

    },
        'click #declineInvite': function(){
      /// update accept in invitation object
        this.accepted=false;
     //if this has been declined prior, this will remove it from the list
      if(acceptedInvites.indexOf(this._id)>-1){
        acceptedInvites.splice(acceptedInvites.indexOf(this._id),1); 
      }
      else if(unseenInvites.indexOf(this._id)>-1){
        unseenInvites.splice(unseenInvites.indexOf(this._id),1); 
      }

       declinedInvites.push(this._id);

       Session.set('declinedInvites',declinedInvites);
       Session.set('acceptedInvites',acceptedInvites);
       Session.set('unseenInvites',unseenInvites);
        Invitations.update({_id:this._id}, {$set:{accepted:false}});
    }
});

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

Template.submittedEvents.helpers({
    'getSubmittedEvents':function(){
        if(Meteor.user()){
            return Session.get('invitations');
        }
      }

});



goToActInfo=function(act){
   var the_id = act._id;
      console.log("this",act);
      if(isAdmin){
        Session.set('actInfoEvent',act.activity);
      }
      else{
          Session.set('current_activity',Meteor.subscribe('event_by_id',the_id));
          Session.set('actInfoEvent',act);
      }
      Router.go('actInfo',{_id: the_id, isInvite:[0]});
};

function acceptEvent (obj){
   //call insert on the object
    Activities.insert(obj);

  //call geocode function on the object
  geocode_update_db(obj);
}


function makeAcceptedLists(sent, submittedEvents){
      if(submittedEvents=="submittedEvents"){
        listEvents= SubmittedEvents.find({}).fetch();
      }
      else{
          if(sent=="sent"){
            listEvents= Invitations.find({inviterID: Meteor.user()._id}).fetch();
          }
        else{
            listEvents= Invitations.find({inviteeID: Meteor.user()._id}).fetch();
          }
      }
      
      for(var i=0;i<listEvents.length; i++){
        if(listEvents[i].accepted=="unseen"){
          unseenInvites.push(listEvents[i]._id);
          console.log('submitterName',listEvents[i].submitterName);
        }
        else if(listEvents[i].accepted==true){
          acceptedInvites.push(listEvents[i]._id);
        }
        else{
          declinedInvites.push(listEvents[i]._id);
        }

        }
        if("sent")
      Session.set('declinedInvites',declinedInvites);
      Session.set('acceptedInvites',acceptedInvites);
      Session.set('unseenInvites',unseenInvites);
      console.log(sent,declinedInvites,"declinedInvites" );
       // console.log(Session.get('declinedInvites'), "did this set not work???");
      console.log(sent,declinedInvites,"unseenInvites" );
      console.log(sent,acceptedInvites,"acceptedInvites" );
      return listEvents;
}

isAdmin=function(){
  return Meteor.user().profile.name=="admin admin";
}
onMobile=function(){
    return isMobile;
}

function removeInvite(inviteID){
    //if its an invitation, remove it from invitations
    //for now, just have it for invitations later maybe change to have for favorites as well
        Invitations.remove({_id:inviteID});
        declinedInvites.splice(declinedInvites.indexOf(inviteID),1); 
        acceptedInvites.splice(acceptedInvites.indexOf(inviteID),1); 
        unseenInvites.splice(unseenInvites.indexOf(inviteID),1); 
        sentInvitations.splice(sentInvitations.indexOf(inviteID),1);
        invitations.splice(invitations.indexOf(inviteID),1);
      Session.set('declinedInvites',declinedInvites);
      Session.set('acceptedInvites',acceptedInvites);
      Session.set('unseenInvites',unseenInvites);
    Session.set("sentInvitations",sentInvitations);
    Session.set("invitations",invitations);

}
