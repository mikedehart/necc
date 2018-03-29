


/*
	These are hacks for validating values from the Google API. Reason:
		- start end dates return: obj.start.date if no time is set
								  obj.start.dateTime if a date is set

	  	- location is not present if it is left off of the event

	  	By default these will return 'N/A' if not applicable for now.
*/

// Return val if defined, otherwise return passed in default value or 'N/A'
function validateValue(val, defVal="N/A") {return ((typeof(val) !== 'undefined') ? val : defVal)}

// Choose either date or dateTime
function chooseDate(date, dateTime) {return ((typeof(date) !== 'undefined') ? date : dateTime)}

function getEventTime(fullDate) {
	// Slices time and converts to am/pm;
	var time = fullDate.slice(11,16);
	var hr = parseInt(time.slice(0,2));
	var rest = time.slice(2);
	var suffix = (hr >= 12) ? 'pm' : 'am';
	hr = ((hr + 11) % 12 + 1);
	return (hr + rest + suffix);
}

function stringifyTime(startTime, endTime) {
	let start = ((startTime.length > 10) ? getEventTime(startTime) : '?'); 
	let end = ((endTime.length > 10) ? getEventTime(endTime) : '?');

	return `${start} to ${end}`;
}


function getCal () {
	let urlString = 'https://www.googleapis.com/calendar/v3/calendars/odfj419lp01ad8bsgp78d4dh8k@group.calendar.google.com/events?key=AIzaSyCc8FP8nhI-HXrxQnJ6-9_v6GsaD_rPXr4&timeMin=' + new Date().toISOString() + '&maxResults=7&singleEvents=true&orderBy=startTime';
	let currPage = window.location.href.split('/').pop();
	$.ajax({
		url: urlString,
		type: "GET",
		dataType: "json",
		success: function(response) {
			processEvents(response);
		}
	});
}

function processEvents(res) {
	let events = res.items;
	let monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let allEvents = [];

		events.map((e) => {
			
			let cLoc = validateValue(e.location);
			let cStart = chooseDate(e.start.date, e.start.dateTime);
			let cEnd = chooseDate(e.end.date, e.end.dateTime);

			let cMonth = ((cStart) => { return parseInt(cStart.slice(5,7)) })(cStart);
			let cDay = ((cStart) => { return parseInt(cStart.slice(8,10)) })(cStart);
			let cTime = stringifyTime(cStart, cEnd);
			let cLLink = (() => { return ((cLoc !== "N/A") ? ["https://www.google.com/maps/search", cLoc.replace(/ /g, "+")].join('/') : '#')})(cLoc);
			let cELink = e.htmlLink;

			let currentEvent = [
				"<li>",
				"<div class=\"main-event\">",
				"<div class=\"main-event-date\">",
				"<span class=\"month\">",
				cMonth,
				"</span>",
				"<span class=\"day\">",
				cDay,
				"</span>",
				"</div>",
				"<aside>",
				"<p class=\"main-event-title\"><a href=\"",
				cELink,
				"\">",
				validateValue(e.summary),
				"</a></p>",
				"<p class=\"main-event-time\">",
				cTime,
				"</p>",
				"<p class=\"main-event-location\"><a href=\"",
				cLLink,
				"\">",
				cLoc,
				"</a></p>",
				"</aside>",
				"<p class=\"main-event-desc\">",
				validateValue(e.description),
				"</p>",
				"</div>",
				"</li>"
			];
		
			allEvents.push(currentEvent.join(""));
		})

	return allEvents;
}

/**
	TEST FUNCTION 



function testAPI() {
	var urlString = 'https://www.googleapis.com/calendar/v3/calendars/odfj419lp01ad8bsgp78d4dh8k@group.calendar.google.com/events?key=AIzaSyCc8FP8nhI-HXrxQnJ6-9_v6GsaD_rPXr4&timeMin=' + new Date().toISOString() + '&maxResults=7&singleEvents=true&orderBy=startTime';
	$.ajax({
		url: urlString,
		type: "GET",
		dataType: "json",
		success: function(response) {
			var x = response['items'];
			var vals = [];
			for (i in x) {
				var e  = x[i]['creator']['email'];
				vals.push(e);
				if (e === 'deannamdehart@gmail.com') {
					console.log('Matches');
				}
			}
			//document.getElementById("test1").innerHTML = vals.join("\n");
			console.log(vals.join("\n"));
			var suffixUrl = window.location.href.split('/').pop();
			console.log(suffixUrl);
		}
	});
}

*/