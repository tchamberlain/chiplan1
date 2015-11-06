Template.invite_modal.helpers({
  'get_shareEvent': function () {
    return Session.get('shareEvent');
  },
  'get_person': function(){
      return Session.get('query_name');
   }
});

Template.invite_modal.events({
     
     'click #invite': function () {
      invitee= Session.get('query_name');
      invite_activity= Session.get('shareEvent');
      inviter= Meteor.user();

      //Were going to insert an invitation into the db
      Invitations.insert({
                     inviteStr:""+inviter._id+invitee._id+invite_activity.title,
                     activity: invite_activity,
                     actTitle: invite_activity.title,
                     inviterName: inviter.profile.name,
                     inviteeName:invitee.profile.name,
                     inviterID: inviter._id,
                     inviteeID:invitee._id,
                     accepted:"unseen"
        });
    }
});



