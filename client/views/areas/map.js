function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(50.999497, -118.196411),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    var map = new google.maps.Map($("#map_canvas")[0], mapOptions);
}

Template.map.rendered = function(){
    initialize();
};