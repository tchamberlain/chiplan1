CHIPLAN 

WHAT IS IT?
-----------

A prototype of an app for UChicago Crime Lab, designed to 
help Chicago-area high schoolers find interesting and safe events 
around the city.

STRUCTURE 
-----------


Client folder <---holds all code that will be executed on the client
--------------
There is a separate folder holding the javascript and html for each page of the app.
  





Server folder <----- holds code that will be exectuted on the server. 
--------------

Collections folder <----- holds code that initializes 4 collections with data on both client and server side.
-------------------

The 4 collections are Preactivities, Activities, Invitations, and submittedEvents. 
    
    1)Activities holds a document for each event the user can browse (each activity), along with it's description, date, etc. 
    2)Invitations holds any user-user invites 
      -Each invitation holds the activity, the inviter name, inviter id, invitee name, invitee id, the activity title
    3)submittedEvents holds any user submitted events, seen only by an admin with an admin login
    4)Preactivities is only used to import new events into Activities from a csv file (first an activity is mongo imported into   preactivities, then inserted into activities, in order to use the meteor _id rather than the default mongo id)



MUPConfig folder <----- holds code for using meteor up --> ????? CHECK IF I CAN STORE THESE FILES W/IN A FOLDER
--------------


forImportingEvents folder <----- holds python code for scraping event info from websites
-------------------------






