 //*************************
//SERVER STUFF
//*************************

Meteor.startup(function() {
  //this removes events that have already happened from the activity db and the invitaiton db
  removeOldEvents();

});

function removeOldEvents(){
    yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); 
    remove_these=Activities.find({start_date: {$lt: yesterday}});
    Activities.remove({start_date: {$lt: yesterday}});
    Invitations.remove({start_date: {$lt: yesterday}});
}

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


//change the time string into a human readable time
getDatesTime= function(now, parks){
  var year    = now.getFullYear();
  var hour    = now.getHours();
  //correct for wrong time zone
  var hour    = now.getHours()+5;
  var minute  = now.getMinutes();
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }  
    am_pm="AM";
    if(hour==12){
      am_pm="PM";
    }
    else if(hour>12){
      am_pm="PM";
      hour-=12;
    }

    time=""+hour+":"+minute+" "+am_pm;
    return time;
}