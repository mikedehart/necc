
function initCal() {
	gapi.load('client', start);
}

function start(){
	console.log("before init");
	gapi.client.init({
		'apiKey': 'AIzaSyCc8FP8nhI-HXrxQnJ6-9_v6GsaD_rPXr4',
		'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
		// client ID and scope are optional if auth not required
		//'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    	//'scope': 'profile',
	}).then(function(){
		// Initialize and make API request
		listUpcomingEvents();
	});
}

function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
}


function listUpcomingEvents() {
        gapi.client.calendar.events.list({
          'calendarId': '5bsos247d2bcrmv7v9kird8vt8@group.calendar.google.com',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
          var events = response.result.items;
          appendPre('Upcoming events:');

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')');
              console.log(event.summary + ' (' + when + ')');
            }
          } else {
            appendPre('No upcoming events found.');
            console.log('No upcoming events found.');
          }
      	});
}
