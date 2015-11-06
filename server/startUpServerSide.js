
Meteor.startup(function() {

  //this removes events that have already happened from the activity db and the invitaiton db
  removeOldEvents();
 

 //if there are activities to be added (so preactivities is not empty), insert them into the activities db
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
