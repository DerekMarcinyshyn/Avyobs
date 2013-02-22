function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(50.999497, -118.196411),
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
    initialize();
};