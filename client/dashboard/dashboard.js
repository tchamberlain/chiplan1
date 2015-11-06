  //------------------------------------------------------//
 //------------------ dashboard ROUTES ------------------//
//------------------------------------------------------//
Router.route('/dashboard',{
   waitOn: function(){
          nullGlobals();
         return[ Meteor.subscribe('getInvitations', Meteor.user()),Meteor.subscribe('getSentInvitations', Meteor.user()),Meteor.subscribe('getSubmittedEvents',Meteor.user())];
        }
  });

  //------------------------------------------------------//
 //----------------- dashboard INITIALIZATION -----------//
//------------------------------------------------------//
//when the dashboard is created we need to make lists of invites that have been declined /accepted
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

  //------------------------------------------------------//
 //------------------ dashboard HELPERS -----------------//
//------------------------------------------------------//
Template.dashboard.helpers({
    'is_admin':function(){
        return isAdmin();
  }
});


  //------------------------------------------------------//
 //--------------- dashboard FUNCTIONS ------------------//
//------------------------------------------------------//

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
