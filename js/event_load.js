function getCal () {
	$.ajax({
		url: "https://www.googleapis.com/calendar/v3/calendars/5bsos247d2bcrmv7v9kird8vt8%40group.calendar.google.com/events?key=AIzaSyCc8FP8nhI-HXrxQnJ6-9_v6GsaD_rPXr4&timeMin=" + new Date().toISOString() +
		"&maxResults=7",
		type: "GET",
		dataType: "json",
		success: function(response) {
			processEvents(response);
		}
	});
}

function processEvents(response) {
	let x = response['items'];
	let month_abbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let allEvents = [];
	for (i in x) {
		let loc = x[i]['location'];
		let singleEvent = [];
		let eventDate = x[i]['start']['dateTime'];
		let mnth = month_abbr[getEventMonth(eventDate) - 1];
		let day = getEventDay(eventDate);
		let htmlLink = x[i]['htmlLink'];
		let description = x[i]['description'];
		let title = x[i]['summary'];
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
				"TODO",
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
	
	$("#eventCol").html(allEvents.join("\n"));
}

function getEventMonth(fullDate) {
	return parseInt(fullDate.slice(5,7));
}

function getEventDay(fullDate) {
	return parseInt(fullDate.slice(8,10));
}
