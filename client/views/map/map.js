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

    // Get the markers
    var markers = Posts.find();

    markers.forEach(function(marker) {
        // check variables
        var tempMeasured = '';
        if (marker.tempMeasured) {
            switch(marker.tempMeasured) {
                case 1:
                    tempMeasured += 'Measured';
                    break;
                case 2:
                    tempMeasured += 'Guessed';
                    break;
                default:
                    tempMeasured += '';
            }
        }

        var temp = '';
        if (marker.temp)
            temp += 'Temperature: '+marker.temp +'&deg;C '+tempMeasured+'<br/>';

        var wind = '';
        if (marker.wind)
            wind += 'Wind: '+marker.wind+' '+marker.windSpeed+'<br/>';




        // create info window
        var contentString = '<div id="content">'+
            '<p style="font-size:large;font-weight:bold;">'+marker.location+'</p>'+
            '<div id="bodyContent">'+
            '<p>Date: '+ marker.date +'<br/>'+
            'Time: '+ marker.time + '<br/>'+
            'Posted by: '+ marker.author + '<br/>'+
            temp+
            wind+



            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });


        // add marker to map
        var rawLatLng = marker.latLng.replace('(','');
        rawLatLng = rawLatLng.replace(')','');
        var latlngStr = rawLatLng.split(",",2);
        var lat = parseFloat(latlngStr[0]);
        var lng = parseFloat(latlngStr[1]);
        var markerLatLng = new google.maps.LatLng(lat, lng);
        var markerOnMap = new google.maps.Marker({
            position: markerLatLng,
            map: map,
            title: marker.location
        });

        google.maps.event.addListener(markerOnMap, 'click', function() {
            infowindow.open(map, markerOnMap);
        });

        //console.log(marker);

    });
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
        }
    });
};
