function getCal () {

	let urlString = "https://www.googleapis.com/calendar/v3/calendars/odfj419lp01ad8bsgp78d4dh8k@group.calendar.google.com/events?key=AIzaSyCc8FP8nhI-HXrxQnJ6-9_v6GsaD_rPXr4&timeMin=" + new Date().toISOString() + "&maxResults=7&singleEvents=true&orderBy=startTime";
	$.ajax({
		url: urlString,
		type: "GET",
		dataType: "json",
		success: function(response) {
			processEvents(response);
		}
	});
}

function processEvents(response) {
	let x = response['items'];
	let monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let allEvents = [];
	for (i in x) {
		let loc = x[i]['location'];	// Event Location
		let singleEvent = [];	// This is filled and pushed to allEvents array
		let startDate = x[i]['start']['dateTime'];	// Start date/time of the event
		let endDate = x[i]['end']['dateTime'];	// End date/time of the event
		let mnth = monthAbbr[getEventMonth(startDate) - 1];	// 3-char month using the numeric value for index.
		let day = getEventDay(startDate); // Calendar day of the event
		let htmlLink = x[i]['htmlLink'];	// HTML link to the event in Google cal.
		let eventTime = [getEventTime(startDate), "to", getEventTime(endDate)].join(" "); // String for total event time i.e. "10:00 to 12:00"
		let description = x[i]['description']; // Description field for details on event
		let title = x[i]['summary']; // Event title



		console.log(x[i]['start']['dateTime']);
	
		singleEvent.push(
				"<li>",
				"<div class=\"main-event\">",
				"<div class=\"main-event-date\">",
				"<span class=\"month\">",
				mnth,
				"</span>",
				"<span class=\"day\">",
				day,
				"</span>",
				"</div>",
				"<aside>",
				"<p class=\"main-event-title\"><a href=\"",
				htmlLink,
				"\">",
				title,
				"</a></p>",
				"<p class=\"main-event-time\">",
				eventTime,
				"</p>",
				"<p class=\"main-event-location\">",
				loc,
				"</p>",
				"</aside>",
				"<p class=\"main-event-desc\">",
				description,
				"</p>",
				"</div>",
				"</li>"
			);

		allEvents.push(singleEvent.join(""));
	}
	
	document.getElementById("event_list").innerHTML = allEvents.join("\n");
	//$("#eventCol").html(allEvents.join("\n"));
}

function getEventMonth(fullDate) {
	return parseInt(fullDate.slice(5,7));
}

function getEventDay(fullDate) {
	return parseInt(fullDate.slice(8,10));
}

function getEventTime(fullDate) {
	// TODO: conver this to am/pm
	return fullDate.slice(11,16);
}
