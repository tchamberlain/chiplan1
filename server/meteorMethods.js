//meteor methods

Meteor.methods({
    //adds an invite to a user's profile
    'sendInvite': function(inviter,invitee,activity){
        var invite= {};
        invite.invitee=invitee;
        invite.inviter=inviter;
        invite.activity=activity;

        //if the inviter does not have a sent invitations list, add one
        if(!inviter.profile.sentInvitations){
        	//update this user, adding the invite to inviter's profile
        	Meteor.users.update({_id: inviter._id}, {$set: {'profile.sentInvitations': [invite]}});
        }
        else{
        	Meteor.users.update({_id: inviter._id}, {$addToSet: {'profile.sentInvitations': invite}});
        }

        //add invite to invitee's profile
        if(!invitee.profile.invitations||invitee.profile.invitations.length==0){
        	//update this user
        	Meteor.users.update({_id: invitee._id}, {$set: {'profile.invitations': [invite]}});
        }
        else{
        	Meteor.users.update({_id: invitee._id}, {$addToSet: {'profile.invitations': invite}});
        }
    },
    

    //allows admin to accept events that users have submitted, meaning those events will be added to the database for everyone to see
     'acceptEvent': function(newEvent){
        
        //note, you are not geocoding user submitted events, which you may want to change in the future
        lat=0;
        lng=0;

        Activities.insert({
            title: newEvent.title,
            start_time: newEvent.start_time,
            end_time: newEvent.end_time,
            start_date: newEvent.start_date,
            end_date: newEvent.end_date,
            address: newEvent.address,
            description: newEvent.description,
            tags: newEvent.tags,
            source: "userInput",
            location: {
                "type" : "Point",
                "coordinates" : [ 
                  lng, 
                  lat
                ]
                }
        })

        console.log("Hello world, you've accepted this event!!! goooo job");
    }
});