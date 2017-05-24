function getCal () {
	$.ajax({
		url: "https://www.googleapis.com/calendar/v3/calendars/5bsos247d2bcrmv7v9kird8vt8%40group.calendar.google.com/events?key=AIzaSyCc8FP8nhI-HXrxQnJ6-9_v6GsaD_rPXr4&timeMin=" + new Date().toISOString(),
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
	for (i in x){
		let loc = x[i]['location'];
		console.log(loc);
		let eventDate = x[i]['start']['dateTime'].slice(0,10);
		let mnth = month_abbr[getEventMonth(eventDate) - 1];
		let day = getEventDay(eventDate);
		console.log(eventDate + " " + mnth);
	}
	/* for (let i = 0;i<x.length;i++){
		let loc = x[i]['location'];
		let date_time = x[i]['start'];
		console.log(loc);
		console.log(date_time);
	} */
	console.log(x);
}

function getEventMonth(fullDate) {
	return parseInt(fullDate.slice(5,7));
}

function getEventDay(fullDate) {
	return parseInt(fullDate.slice(8,10));
}
