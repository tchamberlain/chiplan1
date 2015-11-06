
  //------------------------------------------------------//
 //---------------- submittedEvents HELPER --------------//
//------------------------------------------------------//
Template.submittedEvents.helpers({
    'getSubmittedEvents':function(){
        if(Meteor.user()){
            return Session.get('invitations');
        }
      }
});

