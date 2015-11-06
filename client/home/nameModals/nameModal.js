

//controls the modal that pops up when a user first makes an account, requests more info from them
Template.name_modal.events({
  'click #name_enter': function(evt, template){
    var first_name = template.find(".first_name").value;
    var last_name = template.find(".last_name").value;
    var full_name= first_name+' '+last_name;
    var month = template.find(".month").value;
    var year = template.find(".year").value;
    var day = template.find(".day").value;
  
    var DOB= month+"/"+day+"/"+year;

      //update this user's account to include their name and DOB
       Meteor.users.update({_id: Meteor.user()._id}, {$set: {
                      'profile.name': full_name,
                      'profile.DOB': DOB,
                      'profile.hasSwiped':false,
                      'profile.favorites': [],
                      'profile.discard': []
                      }});
        console.log(Meteor.user().profile.name)
        console.log(Meteor.user().profile.DOB)
          }
});

