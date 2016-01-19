$(document).ready(function() {
        
    startTime();

    $('#garageToggle').click(function(e) {
            e.preventDefault();
            $.get("/GarageOpener/trigger.php?trigger=1");
            console.log("clicked");
    });


	getRedditNews();
	getWeather(); 

	//update News/Weather every 12 minutes
    setInterval( function(){
    	getRedditNews();
    	getWeather(); 
    	console.log('getting data');
    }, 720000);

	// $('#calendar').fullCalendar({
 //        // put your options and callbacks here
 //    })

});

//get news from Reddit.com in JSON format
function getRedditNews() {
	$.getJSON(
        "https://www.reddit.com/r/news/.json?jsonp=?",
        function(data)
        {
        	$("#redditNews").empty();
        	//removed a break after "Today's News"
        	$("#redditNews").append( '<br> <h1> Today\'s News </h1>');

			$.each(
				data.data.children.slice(0, 5),
				function (i, post) {
					//removed a break before the title
					$("#redditNews").append( '<h3>' + post.data.title + '</h3>');
					$("#redditNews").append( '<a href=' + post.data.url + '>' + post.data.url + '</a>' );
					// $("#redditNews").append( '<br>' + post.data.permalink );
					$("#redditNews").append( '<br> UPS: ' + post.data.ups);
					$("#redditNews").append( '<hr>' );

				}
			)
        }
    );
}

//retrieve weather from Open Weather Map
function getWeather() {

	//TODO adjust day and night based on sunrise/sunset time
	var t = new Date();
	var h = t.getHours();
	var tod = h < 6 || h > 18 ? 'night' : 'day';

	
	 $.getJSON(	"/GarageOpener/info.json", function(data) {

		    var openWeatherMapAPIKey = data.openWeatherAPIKey;

			$.getJSON(
			    "http://api.openweathermap.org/data/2.5/weather?zip=20148,us&appid=" + openWeatherMapAPIKey,
			    function(data) {
			   	
			    	$("#weather").empty();

			    	//weather ID used for determining icon to display
			    	var wid = data.weather[0].id;

			    	//append weather info to DOM
			    	$("#weather").append('<i class="wi wi-owm-' + tod + '-' +wid +'" style="font-size: 200px;"></i>');

			    	var temp = Math.round((data.main.temp - 273.15) * 1.8000 + 32.00);

					console.log("Temperature: " + temp);
					console.log(data.weather[0].description);
					console.log(data.sys.sunrise);
					console.log(new Date(data.sys.sunrise + Date.now()));

					$("#weather").append( '<br> <h4 style="font-size: 30px;">' + data.weather[0].description + '</h4>');
					$("#weather").append( '<h3 style="font-size: 40px;">' + temp + '&degF</h3>');

						/* Possibly interesting current weather statistics
							main.temp
							main.temp_max/min
							sys.sunrise
							sys.sunset
							weather.0/1/2.description
							weather.0/1/2.icon
							weather.0/1/2.main
							wind.speed
							rain.1h
						*/
			    }
			);
		}
	);
}

function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        if(h >= 13) {
        	h = h - 12;
        }
        if(h == 0) {
        	h = 12;
        }
        m = checkTime(m);
        s = checkTime(s);
        $("#clockHeader").html(h + ":" + m + ":" + s);
        var t = setTimeout(startTime, 500);
}

function checkTime(i) {
        if (i < 10) {
                i = "0" + i;
        }  // add zero in front of numbers < 10
    return i;
}