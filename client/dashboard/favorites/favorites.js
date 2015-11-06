
  //------------------------------------------------------//
 //------------------ favorites HELPERS -----------------//
//------------------------------------------------------//
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



  //------------------------------------------------------//
 //------------------ favorites EVENTS ------------------//
//------------------------------------------------------//
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
