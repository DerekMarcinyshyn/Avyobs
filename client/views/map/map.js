function initialize(position) {
    var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
        center: coords,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    var map = new google.maps.Map($("#map_canvas")[0], mapOptions);

    var weatherLayer = new google.maps.weather.WeatherLayer({
        temperatureUnits: google.maps.weather.TemperatureUnit.CELSUIS,
        windSpeedUnits: google.maps.weather.WindSpeedUnit.KILOMETERS_PER_HOUR
    });
    weatherLayer.setMap(map);

    var cloudLayer = new google.maps.weather.CloudLayer();
    cloudLayer.setMap(map);
}


Template.map.rendered = function(){


    // check if we can use the device location
    navigator.geolocation.getCurrentPosition(initialize, function(error) {
        // use Revelstoke as center of the universe
        var defaultPosition = {coords:{latitude:50.999497, longitude:-118.196411}};

        switch(error.code)
        {
            case error.PERMISSION_DENIED:
                initialize(defaultPosition);
                break;

            case error.POSITION_UNAVAILABLE:
                initialize(defaultPosition);
                break;

            case error.TIMEOUT:
                initialize(defaultPosition);
                break;

            default:
                initialize(defaultPosition);
                break;
       }
    });
};