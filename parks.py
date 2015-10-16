import os
import urllib2
import csv

spamWriter = csv.writer(open('parksProgramsEvents.csv', 'wb'))
#write headerline for csv file
spamWriter.writerow(["title","start_date_f","end_date_f","address","description","source","tags"])





def scrapeParks(htmlFile):
	#we want to enter the loop that reads in pages, so we set pageContainsEvents as 0 to start it
	pageContainsEvents=0
	page=0

	#scan page if it has events, if it does not we have scanned all pages
	while(pageContainsEvents>-1){

		#for each new page, set textReviewed back to 0
		textReviewed=0

		#if there is not fullCode, we know we are on the first loop, and have not yet read in a page
		if(fullCode)
			#update current event to the next event
			indexCurrentEvent=fullCode.find('class="an-activityName"',textReviewed)
			
			#if there is another event on the page, we will scrape info from it
			while(indexCurrentEvent>0)
				title=getCodeSnippetBetween(fullCode,textReviewed, ">", "<") 
				description=getCodeSnippetBetween(fullCode,textReviewed, "original-title=\"<div style='padding-right:30px;min-width:200px;\'>", "<")
				start_date_f="fake"
				end_date_f="fake"
				address="fake"
				source="parksPrograms"
				isTeenEvent=0

				console.log(title,description);

				#update text reviewed, so that we search for the next event
				textReviewed=indexCurrentEvent

				#write this event to the csv file , but only if it is a teen event
				if(isTeenEvent)
					#tags are set as "none", since we have not yet tagged this item
					console.log()
	       			spamWriter.writerow([title,start_date_f,end_date_f,address,description,source,"none"])

			
		#go to next page
		page+=1

		#print to terminal to keep track of where you are in the process
	    print "parks page " + str(page)

	    #open the url
	    urlBase = "https://apm.activecommunities.com/chicagoparkdistrict/Activity_Search?Page=" 
	    url = urlBase + str(page) 
	    html = opener.open(url)

		#read in code and write it to the html txt file
    	fullCode = html.read()

   		#will this take away old code from previous page?????????????????????!!!!!
    	htmlFile.write(fullcode)

    	#check if page contains events
		pageContainsEvents=fullCode.find('class="an-activityName"');

	}



def getCodeSnippetBetween(fullCode,textReviewed,startString,endString){
	startIndex=fullCode.find(startString,textReviewed)
	endIndex=fullCode.find(startString,textReviewed)
	return(fullCode.substring(startIndex,endIndex))
}
