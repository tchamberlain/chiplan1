
import os
import urllib2
import csv





spamWriter = csv.writer(open('parksProgramsEvents.csv', 'wb'))
#write headerline for csv file
spamWriter.writerow(["title","start_date_f","end_date_f","address","description","source","tags"])


#set up thing to open website to scrape
agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5'
opener = urllib2.build_opener()
opener.addheaders = [('User-agent', agent)]



def getCodeSnippetBetween(fullCode,textReviewed,startString,endString):
	startIndex=fullCode.find(startString,textReviewed)
	endIndex=fullCode.find(endString,textReviewed)
	snippet=fullCode[startIndex+len(startString):endIndex]
	return snippet


def scrapeParks(htmlFile):
	#we want to enter the loop that reads in pages, so we set pageContainsEvents as 0 to start it
	pageContainsEvents=0
	page=0
	fullCode=0

	#scan page if it has events, if it does not we have scanned all pages
	while (pageContainsEvents >- 1):

		#for each new page, set textReviewed back to 0
		textReviewed=0

		#if there is not fullCode, we know we are on the first loop, and have not yet read in a page
		if(fullCode):
			#update current event to the next event
			indexCurrentEvent=fullCode.find('class="an-activityName"',textReviewed)
			textReviewed=indexCurrentEvent +len('class="an-activityName"')
			#if there is another event on the page, we will scrape info from it
			while(indexCurrentEvent>0):
				title=getCodeSnippetBetween(fullCode,textReviewed, ">", "<") 
				description=getCodeSnippetBetween(fullCode,textReviewed, "\" original-title=\"<div style=\'padding-right:30px;min-width:200px;\'>", "</div>\" href=\"javascript:void(0);\"><i class=\"icon-info-sign\"")
				start_date="fake"
				address="fake"
				end_date="fake"
				source="parksPrograms"

				eventIsFree=fullCode[textReviewed:fullCode.find('<p></p></span></td>')].find("free");

				if(eventIsFree):
					print page, title, description


				#update text reviewed, so that we search for the next event
				indexCurrentEvent=fullCode.find('class="an-activityName"',textReviewed)
				textReviewed=indexCurrentEvent +len('class="an-activityName"')

				## for each day in month of october november create an event
				datesToWrite=[];

				#loop through and add a start date for each day necessary
				getDatesToWrite(dayOfWeek);

				#write these event to the csv file , but only if it is a teen event
				for(start_date in datesToWrite)
					spamWriter.writerow([title,start_date,end_date,address,description,source,"none"])

			
		#go to next page
		page+=1

		#print to terminal to keep track of where you are in the process
		print "parks page " + str(page)

		#open the url
		urlBase = "https://apm.activecommunities.com/chicagoparkdistrict/Activity_Search?ActivityCategoryID=5&isSearch=true&Page=" 
		url = urlBase + str(page) 
		html = opener.open(url)

		#read in code and write it to the html txt file
		fullCode = html.read()

		#will this take away old code from previous page?????????????????????!!!!!
		htmlFile.write(fullCode)

		#check if page contains events
		pageContainsEvents=fullCode.find('class="an-activityName"');


htmlContent = open('testfileHTML.txt', 'w')
scrapeParks(htmlContent);
