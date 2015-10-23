 //*************************
//SERVER STUFF
//*************************

Meteor.startup(function() {
  //this removes events that have already happened from the activity db and the invitaiton db
  removeOldEvents();
  //add activities from preActivities to activities, if there are  activities in pre
  if(Pre_activities.find().count()!=0){
    // insertLibraryActivitiesIntoDB(); 
    // insertStayInActivitiesIntoDB(); 
    testAdd();
  }
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


function testAdd(){
  Pre_activities.find().forEach(    
    function (elem) {     
      
     // if(elem.source=="stayinSurvey"){
       //  var title=elem.title;
       //  var start_date = new Date(elem.start_date_f);
       //  var dd = start_date.getDate();
       //  var mm = start_date.getMonth();
       //  var yr = start_date.getFullYear();
       //  start_date1= new Date(yr,mm,dd);
       //  var end_date = new Date(elem.end_date_f);
       //  var dd = end_date.getDate();
       //  var mm = end_date.getMonth();
       //  var yr = end_date.getFullYear();
       //  end_date1= new Date(yr,mm,dd);
  

       //  var start_time= start_date.getHours()
       //  am_pm= "am"
       //  if(start_time>12){
       //    am_pm="pm"
       //    start_time=start_time-12

       //  }
       // if(start_time==12){
       //    am_pm="am"
       //    start_time=12

       //  }
       //  minutes= start_date.getMinutes()
       //  if (minutes<10){
       //    minutes=minutes+"0"
       //  }
       //  var start_time= start_time+":"+minutes


       //  var end_time= end_date.getHours()
       //  am_pm= "am"
       //  if(end_time>12){
       //    am_pm="pm"
       //    end_time=end_time-12

       //  }
       // if(end_time==12){
       //    am_pm="am"
       //    end_time=12

       //  }
       //  minutes= end_date.getMinutes()
       //  if (minutes<10){
       //    minutes=minutes+"0"
       //  }
       //  var end_time= end_time+":"+minutes

       //  lat=elem.lat
       //  lng=elem.lng
       //  source="library"


        var tags=["stayin"];
        var title=elem.title;
        var start_date1="n/a";
        var start_time="n/a";
        var end_time="n/a";
        var end_date1="n/a";
        var address="n/a";
        var description="n/a";
        var source="stayinSurvey";
        var lat="n/a";
        var lng="n/a";
         
    

      Activities.insert({
        title: title,
        start_time: start_time,
        end_time: end_time,
        start_date: start_date1,
        end_date: end_date1,
        address: address,
        description: description,
        //CHANGE TAGS FOR NOT STAY IN ACTIVITIES!!!
        tags: tags,
        source: source,
        location: {
              "type" : "Point",
              "coordinates" : [ 
                lng, 
                lat
              ]
              }
      });
    //}
  } );
}

function insertLibraryActivitiesIntoDB(){
   Pre_activities.find().forEach(    
    function (elem) {     
  
      if(elem.source=="library"){
        var title=elem.title;
        var start_date_old = new Date(elem.start_date_f);
        var dd = start_date_old.getDate();
        var mm = start_date_old.getMonth();
        var yr = start_date_old.getFullYear();
        start_date= new Date(yr,mm,dd);
        

        var start_time= start_date.getHours()
        am_pm= "am"
        if(start_time>12){
          am_pm="pm"
          start_time=start_time-12

        }
       if(start_time==12){
          am_pm="am"
          start_time=12

        }
        minutes= start_date.getMinutes()
        if (minutes<10){
          minutes=minutes+"0"
        }
        var start_time= start_time+":"+minutes


        var end_time= end_date.getHours()
        am_pm= "am"
        if(end_time>12){
          am_pm="pm"
          end_time=end_time-12

        }
       if(end_time==12){
          am_pm="am"
          end_time=12

        }
        minutes= end_date.getMinutes()
        if (minutes<10){
          minutes=minutes+"0"
        }
        var end_time= end_time+":"+minutes
        lat=elem.lat
        lng=elem.lng
        source="library"
        
      
      
        //call insertActiviity and aactualy insert into act db
       // insertActivity(title, start_time, end_time,start_date,address, description,source, location);
        Pre_activities.remove({_id:elem._id});
      }

  } );
}



// function insertParksProgramsActivitiesIntoDB(){
//      Pre_activities.find().forEach(    
//           function (elem) {  
//           }
//         );

//   //call insertActiviity and actualy insert into act db
//   insertActivity(title,start_time, end_time,start_date,address, description,source, location);
// }


function insertStayInActivitiesIntoDB(){
     Pre_activities.find().forEach(    
          function (elem) {   
            if(elem.source=="survey"){
              //get all info for each event  
              title=elem.title;
              start_time="n/a";
              end_time="n/a";
              start_date="n/a";
              address="n/a";
              description="n/a";
              source="stayinSurvey";
              location="n/a";
              //call insertActiviity and actualy insert into act db
              insertActivity(title,start_time, end_time,start_date,address, description,source, location);
              Pre_activities.remove({_id:elem._id});
            }
          }
        );
}




function insertActivity(title,start_time, end_time,start_date,address, description,source, location){
   Activities.insert({
        title: title,
        start_time: start_time,
        end_time: end_time,
        start_date: start_date,
        end_date: end_date,
        address: elem.address,
        description: elem.description,
        tags: [],
        source: source,
        location: {
              "type" : "Point",
              "coordinates" : [ 
                lng, 
                lat
              ]
              }
      });

}



   
