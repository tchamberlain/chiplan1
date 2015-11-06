//fix name modal upon login
Accounts.onLogin( function(){
    //look back at what's going on with this name modal business
    Session.set('name_modal',1)
    if(Session.get('name_modal')){
      if(!Meteor.user().profile.DOB){
        //does this search just within template? you want it to search whole doc
         $('.ui.modal.name_modal')
          .modal('setting', 'closable', false)
          .modal('show')
    }
  }

  //pull old events from user profile
    pullOldEventsFromProfile();
  });



function pullOldEventsFromProfile(){
    //get yesterdays date, if the event was before yesterday, pull it
    yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); 

    //if there's a user, take the old events off their favorite and discard lists
    if(Meteor.user()){
        user_id=Meteor.user()._id
        Meteor.users.update({_id: user_id}, {$pull: {'profile.favorites': {start_date: {$lt: yesterday} }}});
        Meteor.users.update({_id: user_id}, {$pull: {'profile.discards': {start_date: {$lt: yesterday} }}});
    }
}


