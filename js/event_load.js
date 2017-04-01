function getCal () {
	$.ajax({
		url: "https://www.googleapis.com/calendar/v3/calendars/5bsos247d2bcrmv7v9kird8vt8%40group.calendar.google.com/events?key=AIzaSyCc8FP8nhI-HXrxQnJ6-9_v6GsaD_rPXr4",
		type: "GET",
		dataType: "json",
		success: function(response) {
			console.log(response);
			processEvents(response);
		}

	});
}

function processEvents(response) {
	$('#content1').html(response);
	console.log(response);
}
