//runs everytime new user is created, so that their profile can be changed later
  Accounts.onCreateUser(function(options, user) {
    // We're enforcing at least an empty profile object to avoid needing to check
    // for its existence later.
    user.profile = options.profile ? options.profile : {};
    if (options.profile)
       user.profile = options.profile;

    //attempt to add favorites section
     _.extend(user.profile, { favorites : [] });

     Meteor.setTimeout(
     function(){ if(user.profile.first-name){
      var this_name= user.profile.first-name
      if(!(user.profile.name)){
      _.extend(user.profile, { name : this_name });
    } }},3000)
    return user;
  });
