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

	// $('#calendar').fullCalendar({
 //        // put your options and callbacks here
 //    })

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

	var t = new Date();
	var h = t.getHours();
	var tod = h < 6 || h > 18 ? 'night' : 'day';

	
	 $.getJSON(	"/GarageOpener/info.json", function(data) {

		    var openWeatherMapAPIKey = data.openWeatherAPIKey;

			$.getJSON(
			    "http://api.openweathermap.org/data/2.5/weather?zip=20148,us&appid=" + openWeatherMapAPIKey,
			    function(data) {
			   	
			    	$("#weather").empty();

			    	// //determine class of icon to display
			    	// var weatherIconClass = 'wi wi-';
			    	var wid = data.weather[0].id;
			    	// var wcat = Math.floor(wid/100);
			    	// if(wcat == 7 || wcat == 9) {
			    	// 	console.log("weather category: " + wcat);
			    	// 	//don't add tod
			    	// 	weatherIconClass += getWeatherIconClass(wid);
			    	// }
			    	// else 
			    	// 	weatherIconClass += tod + '-' + getWeatherIconClass(wid);



			    	//append weather info to DOM
			    	$("#weather").append('<i class="wi wi-owm-' + tod + '-' +wid +'" style="font-size: 200px;"></i>');
					//$("#weather").append('<i class="' + weatherIconClass +'" style="font-size: 200px;"></i>');
			    	
			    	//$("#weather").append('<img style="-webkit-user-select: none" src="http://openweathermap.org/img/w/' + data.weather[0].icon +'.png">');
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

function getWeatherIconClass(i) {

	var weatherIconMap = [];
	weatherIconMap[200] = 'thunderstorm';
	weatherIconMap[201] = 'thunderstorm';
	weatherIconMap[202] = 'storm-showers';
	weatherIconMap[210] = 'thunderstorm';
	weatherIconMap[211] = 'lightning';
	weatherIconMap[212] = 'thunderstorm';
	weatherIconMap[221] = 'thunderstorm';
	weatherIconMap[230] = 'thunderstorm';
	weatherIconMap[231] = 'storm-showers';
	weatherIconMap[232] = 'storm-showers';

	weatherIconMap[300] = 'sprinkle';
	weatherIconMap[301] = 'sprinkle';
	weatherIconMap[302] = 'showers';
	weatherIconMap[310] = 'sprinkle';
	weatherIconMap[311] = 'showers';
	weatherIconMap[312] = 'showers';
	weatherIconMap[313] = 'showers';
	weatherIconMap[314] = 'showers';
	weatherIconMap[321] = 'showers';

	weatherIconMap[500] = 'sprinkle';
	weatherIconMap[501] = 'rain';
	weatherIconMap[502] = 'rain';
	weatherIconMap[503] = 'rain';
	weatherIconMap[504] = 'rain';
	weatherIconMap[511] = 'rain-mix';
	weatherIconMap[520] = 'showers';
	weatherIconMap[521] = 'showers';
	weatherIconMap[522] = 'rain';
	weatherIconMap[531] = 'rain-wind';

	weatherIconMap[600] = 'snow';
	weatherIconMap[601] = 'snow';
	weatherIconMap[602] = 'snow';
	weatherIconMap[611] = 'sleet';
	weatherIconMap[612] = 'sleet';
	weatherIconMap[615] = 'snow';
	weatherIconMap[616] = 'snow';
	weatherIconMap[620] = 'snow';
	weatherIconMap[621] = 'snow';
	weatherIconMap[622] = 'snow';

	weatherIconMap[700] = 'fog';
	weatherIconMap[711] = 'smoke';
	weatherIconMap[721] = 'day-haze';
	weatherIconMap[731] = 'sandstorm';
	weatherIconMap[741] = 'fog';
	weatherIconMap[751] = 'sandstorm';
	weatherIconMap[761] = 'dust';
	weatherIconMap[762] = 'volcano';
	weatherIconMap[771] = 'strong-wind';
	weatherIconMap[782] = 'tornado';

	weatherIconMap[800] = 'clear';
	weatherIconMap[801] = 'cloudy-high';
	weatherIconMap[802] = 'cloudy';
	weatherIconMap[803] = 'cloudy';
	weatherIconMap[804] = 'cloudy';

	weatherIconMap[900] = 'tornado';
	weatherIconMap[901] = 'hurricane';
	weatherIconMap[902] = 'hurricane';
	weatherIconMap[903] = 'snowflake-cold';
	weatherIconMap[904] = 'fire';
	weatherIconMap[905] = 'strong-wind';
	weatherIconMap[906] = 'hail';

	weatherIconMap[951] = 'windy';
	weatherIconMap[952] = 'windy';
	weatherIconMap[953] = 'windy';
	weatherIconMap[954] = 'windy';
	weatherIconMap[955] = 'windy';
	weatherIconMap[956] = 'strong-wind';
	weatherIconMap[957] = 'strong-wind';
	weatherIconMap[958] = 'strong-wind';
	weatherIconMap[959] = 'strong-wind';
	weatherIconMap[960] = 'storm-warning';
	weatherIconMap[961] = 'storm-warning';
	weatherIconMap[962] = 'hurricane';

	return weatherIconMap[i];
}