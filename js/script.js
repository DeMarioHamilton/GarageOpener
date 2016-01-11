$(document).ready(function() {
        
    startTime();

    $('#garageToggle').click(function(e) {
            e.preventDefault();
            $.get("/GarageOpener/trigger.php?trigger=1");
            console.log("clicked");
    });

    getRedditNews();
    getWeather();

});

//TODO: add refresh button or refresh every few minutes
    function getRedditNews() {
    	$.getJSON(
	        "http://www.reddit.com/r/news.json?jsonp=?",
	        function(data)
	        {
				$.each(
					data.data.children.slice(0, 5),
					function (i, post) {
						$("#redditNews").append( '<br> <h3>' + post.data.title + '</h3>');
						$("#redditNews").append( post.data.url );
						$("#redditNews").append( '<br>' + post.data.permalink );
						$("#redditNews").append( '<br> UPS: ' + post.data.ups + 'DOWNS: ' + post.data.downs );
						$("#redditNews").append( '<hr>' );
					}
				)
	        }
	    );
    }

function getWeather() {
	var openWeatherMapAPIKey = "";
	 $.getJSON(
		"/GarageOpener/info.json",
		function(data) {
		    openWeatherMapAPIKey = data.openWeatherAPIKey;
		    console.log(openWeatherMapAPIKey);
	$.getJSON(
        "http://api.openweathermap.org/data/2.5/weather?zip=20148,us&appid=" + openWeatherMapAPIKey,
        function(data)
        {
        	var temp = (data.main.temp - 273.15) * 1.8000 + 32.00;
			console.log("Temperature: " + temp);
			$("#clockDiv").append( '<br> <h3> Temperature: ' + temp + '</h3>');
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

