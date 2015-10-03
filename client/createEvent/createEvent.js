//should also prolly make a modal to confirm
//make accept button insert event
//upon accept event, geocode before you insert

Router.route('/createEvent', {
    name: 'createEvent',
        waitOn: function(){
          //not entirely sure why we need to get admin here? now that were doing invitations differently dont needa subscirbe to admin
            return Meteor.subscribe('get_admin');
        }
        
    });

//making a route for the success page once you've created an event
Router.route('/createEvent/success', {
    name: 'success'
    });



Template.createEvent.onRendered(function(){
    $('.ui.dropdown')
    .dropdown();
});


Template.createEvent.events({

	'click #submit': function(evt, template){
		console.log("clicked submit");
    sendEventToAdmin(template);
    submitForm();


 	}
});


 //Get value from an input field
   function getFieldValue(fieldId) { 
      // 'get field' is part of Semantics form behavior API
      return $('.ui.form').form('get field', fieldId).val();
   }

   function submitForm() {
      var newEvent = {
          title: getFieldValue('title'),
          //address: getFieldValue('someId'),
          //start_time: 
      };

      $.ajax({ type: 'POST', url: '/createEvent/success', data: newEvent, success: onFormSubmitted });
   }

   // Handle post response
   function onFormSubmitted(response) {
        console.log('we got to onFormSubmitted', response);

      Router.go('success');

        // Do something with response ...

   }



function sendEventToAdmin(template){
  //first get all of the info from the form
  var title = template.find('input[name=title]').value;
  var start_month = template.find('select[name=start_month]').value -1;
  var start_day = template.find('select[name=start_day]').value;
  var start_year = template.find('input[name=start_year]').value;
  var start_date=new Date(start_year,start_month,start_day);

  var start_hour = template.find('input[name=start_hour]').value;
  var start_min = template.find('input[name=start_minute]').value;
  var start_am_pm =template.find('select[name=start_am_pm]').value;
  var start_time= ""+start_hour+":"+start_min+" "+start_am_pm;

  var end_hour = template.find('input[name=end_hour]').value;
  var end_min = template.find('input[name=end_minute]').value;
  var end_am_pm =template.find('select[name=end_am_pm]').value;
  var end_time= ""+end_hour+":"+end_min+" "+end_am_pm;
 
  var description = template.find('input[name=description]').value;
  var address = template.find('input[name=address]').value;


  //put this into an object 
  var eventObject={
    title:title,
    start_date:start_date,
    end_date:null,
    start_time:start_time,
    end_time:end_time,
    description: description,
    address: address,
    source: "userCreated",
    tags: [],
    location: {
                "type" : "Point",
                "coordinates" : [ 
                  0, 
                  0
                ]
                }
     }
    console.log(eventObject);


     //the "inviter" is the person who created the event
    inviter=Meteor.user();
    invite_activity= eventObject;

      invite_activity=eventObject;
     var invitee=Meteor.users.find({'profile.name':"admin admin"}).fetch()[0]

            //Were going to insert an invitation into the db
      Invitations.insert({
                     inviteStr:""+inviter._id+invitee._id+invite_activity.title,
                     activity: invite_activity,
                     actTitle: invite_activity.title,
                     inviterName: inviter.profile.name,
                     inviteeName:invitee.profile.name,
                     inviterID: inviter._id,
                     inviteeID:invitee._id,
                     actID:invite_activity._id,
                     accepted:"unseen"
        });
}














