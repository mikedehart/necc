function getCal () {
	var urlString = 'https://www.googleapis.com/calendar/v3/calendars/odfj419lp01ad8bsgp78d4dh8k@group.calendar.google.com/events?key=AIzaSyCc8FP8nhI-HXrxQnJ6-9_v6GsaD_rPXr4&timeMin=' + new Date().toISOString() + '&maxResults=7&singleEvents=true&orderBy=startTime';
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
	var x = response['items'];
	var monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var allEvents = [];
	for (i in x) {
		var loc = x[i]['location'];	// Event Location
		var singleEvent = [];	// This is filled and pushed to allEvents array
		var startDate = x[i]['start']['dateTime'];	// Start date/time of the event
		var endDate = x[i]['end']['dateTime'];	// End date/time of the event
		var mnth = monthAbbr[getEventMonth(startDate) - 1];	// 3-char month using the numeric value for index.
		var day = getEventDay(startDate); // Calendar day of the event
		var htmlLink = x[i]['htmlLink'];	// HTML link to the event in Google cal.
		var locLink = ["https://www.google.com/maps/search", loc.replace(/ /g, "+")];
		var eventTime = [getEventTime(startDate), "to", getEventTime(endDate)].join(" "); // String for total event time i.e. "10:00 to 12:00"
		var description = x[i]['description']; // Description field for details on event
		var title = x[i]['summary']; // Event title
	
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
				"<p class=\"main-event-location\"><a href=\"",
				locLink.join('/'),
				"\">",
				loc,
				"</a></p>",
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
	// slices the month from time
	return parseInt(fullDate.slice(5,7));
}

function getEventDay(fullDate) {
	// slices the day from time
	return parseInt(fullDate.slice(8,10));
}

function getEventTime(fullDate) {
	// Slices time and converts to am/pm;
	var time = fullDate.slice(11,16);
	var hr = parseInt(time.slice(0,2));
	var rest = time.slice(2);
	var suffix = (hr >= 12) ? 'pm' : 'am';
	hr = ((hr + 11) % 12 + 1);
	return (hr + rest + suffix);
}


/**
	TEST FUNCTION

*/

function testAPIT() {
	var urlString = 'https://www.googleapis.com/calendar/v3/calendars/odfj419lp01ad8bsgp78d4dh8k@group.calendar.google.com/events?key=AIzaSyCc8FP8nhI-HXrxQnJ6-9_v6GsaD_rPXr4&timeMin=' + new Date().toISOString() + '&maxResults=7&singleEvents=true&orderBy=startTime';
	$.ajax({
		url: urlString,
		type: "GET",
		dataType: "json",
		success: function(response) {
			document.getElementById("test1").innerHTML = response.toString();
		}
	});
}