$(document).ready(function() {
        
    startTime();

    $('#garageToggle').click(function(e) {
            e.preventDefault();
            $.get("/GarageOpener/trigger.php?trigger=1");
            console.log("clicked");
    });


	getRedditNews();
	getWeather(); 

    setInterval( function(){
    	getRedditNews();
    	getWeather(); 
    	console.log('getting data');
    }, 720000);

	$('#calendar').fullCalendar({
        // put your options and callbacks here
    })

});

//TODO: add refresh button or refresh every few minutes
    function getRedditNews() {
    	$.getJSON(
	        "https://www.reddit.com/r/news/.json?jsonp=?",
	        function(data)
	        {
	        	$("#redditNews").empty();
	        	$("#redditNews").append( '<br> <h1 style="float: left"> News </h1> <br>');

				$.each(
					data.data.children.slice(0, 5),
					function (i, post) {
						$("#redditNews").append( '<br> <h3>' + post.data.title + '</h3>');
						$("#redditNews").append( '<a href=' + post.data.url + '>' + post.data.url + '</a>' );
						// $("#redditNews").append( '<br>' + post.data.permalink );
						$("#redditNews").append( '<br> UPS: ' + post.data.ups);
						// + 'DOWNS: ' + post.data.downs 
						$("#redditNews").append( '<hr>' );




					}
				)
	        }
	    );
    }

function getWeather() {

	var weatherIconMap = [];
	weatherIconMap[2] = 'thunderstorm';
	weatherIconMap[3] = 'showers';
	weatherIconMap[5] = 'rain';
	weatherIconMap[6] = 'snow';
	weatherIconMap[7] = 'fog';
	// weatherIconMap[8] = 'clear';
	// weatherIconMap[9] = 'cloudy';
	// weatherIconMap[10] = 'windy';

	var t = new Date();
	var h = t.getHours();
	var tod = h < 6 || h > 18 ? 'night' : 'day';

	
	 $.getJSON(	"/GarageOpener/info.json", function(data) {

		    var openWeatherMapAPIKey = data.openWeatherAPIKey;

			$.getJSON(
			    "http://api.openweathermap.org/data/2.5/weather?zip=20148,us&appid=" + openWeatherMapAPIKey,
			    function(data) {
			   	
			    	$("#weather").empty();

			    	//$("#weather").append('<i class="wi wi-day-sunny" style="font-size: 64px;"></i>');

			    	var weatherIconClass = 'wi wi-';
			    	var wid = data.weather[0].id;

			    	if(Math.floor(wid/100) == 8) {
			    		if(wid == 800 || wid == 801)
			    			weatherIconClass += 'clear';
			    		else 
			    			weatherIconClass += 'cloudy';
			    		
			    	}
			    	else if(Math.floor(wid/100) == 9) {
			    		if(wid == 900)
			    			weatherIconClass += 'tornado';
			    		if(wid == 902)
			    			weatherIconClass += 'hurricane';
			    		if(wid == 905)
			    			weatherIconClass += 'windy';
			    		if(wid == 906)
			    			weatherIconClass += 'hail';
			    		else
			    			weatherIconClass += 'meteor';
			    	}
			    	else {
			    		weatherIconClass += weatherIconMap[Math.floor(wid/100)];
			    	}



					$("#weather").append('<i class="' + weatherIconClass +'" style="font-size: 200px;"></i>');
			    	//$("#weather").append('<img style="-webkit-user-select: none" src="http://openweathermap.org/img/w/' + data.weather[0].icon +'.png">');
			    	var temp = Math.round((data.main.temp - 273.15) * 1.8000 + 32.00);
					console.log("Temperature: " + temp);
					console.log(data.weather[0].description);
					$("#weather").append( '<br> <br> <h3 style="font-size: 40px;">' + temp + '&degF</h3>');


						/*
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

