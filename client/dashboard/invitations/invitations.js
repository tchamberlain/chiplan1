
  //------------------------------------------------------//
 //------------ invitations HELPERS ---------------------//
//------------------------------------------------------//
Template.invitations.helpers({
        'isMobile':function(){
            return isMobile;
    },
    'getDeclineButtonLabel':function(){
          if(isMobile){
            return "";
        }
        else{
            if(Session.get('declinedInvites').indexOf(this._id)>-1){ return "Declined";}
            else{ return "Decline";}
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



  //------------------------------------------------------//
 //------------ invitations EVENTS ---------------------//
//------------------------------------------------------//
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
