---------------------------------------------------------------
---------------------------------------------------------------
--------------------     CHIPLAN     --------------------------
---------------------------------------------------------------
---------------------------------------------------------------

******************************************************************
WHAT IS IT?
******************************************************************

A prototype of an app for UChicago Crime Lab, designed to 
help Chicago-area high schoolers find interesting and safe events 
around the city.

******************************************************************
STRUCTURE 
******************************************************************

----------------------------------------------------------------------------------------
CLIENT folder <-holds all code that will be executed on the client
----------------------------------------------------------------------------------------

There is a separate folder holding the javascript and html for each page of the app.

	* actInfo
		-page that describes info for a given activity
		* directions
			-page with use of google maps api, that shows you directions from your location to the event

	* dashboard
		-The button "My Events" takes you to the dashboard, which shows all events you've favorited, and events you've been invited to

	* eventsTemp
		-the events template, the page a user goes to when after selecting an event category, let's users browse events one by one

	* geocoding
		-Currently commented out, but is the code used to get lat/lng for the events in the database from their address

	* header + htmlMain&Body 
		-contains code that makes header clickable, also the main / body part of the html??? (do i need this... w/ meteor's ironrouter?)

	* home
		-the landing page with the filters to browse activities 

	* onStartupAndLogin
		-contains code to be performed whne meteor first starts up and when a user first logs in

	* seeAll
		-page for browsing events in a list form rather than one by one 

	* semanticUI
		-contains info for semantic ui package

	* share
		-the page users go to after favoriting an event, prompting them to share it with their friends


----------------------------------------------------------------------------------------
SERVER folder <-holds code that will be exectuted on the server. 
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
COLLECTIONS folder <-holds code that initializes 4 collections with data on both client and server side.
----------------------------------------------------------------------------------------

The 4 collections are Preactivities, Activities, Invitations, and submittedEvents. 
    
    1)Activities holds a document for each event the user can browse (each activity), along with it's description, date, etc. 
    2)Invitations holds any user-user invites 
      -Each invitation holds the activity, the inviter name, inviter id, invitee name, invitee id, the activity title
    3)submittedEvents holds any user submitted events, seen only by an admin with an admin login
    4)Preactivities is only used to import new events into Activities from a csv file (first an activity is mongo imported into   preactivities, then inserted into activities, in order to use the meteor _id rather than the default mongo id)


----------------------------------------------------------------------------------------
MUPConfig folder <-holds code for using meteor up --> ????? CHECK IF I CAN STORE THESE FILES W/IN A FOLDER
----------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------
FORIMPORTINGEVENTS folder <-holds python code for scraping event info from websites
----------------------------------------------------------------------------------------



