Template.post_submit.rendered = function() {
    $('#date').datepicker();
    $('#time').timepicker();
    $('#setTimeButton').on('click', function() {
        $('#time').timepicker('setTime', new Date());
    });

    // add map
    submitMapInitialize();

    // show avalanche observations
    $('#show_avi').click(function() {
        $('#see_avi').toggle(this.checked);
    });
}


Template.post_submit.events = {

}

function submitMapInitialize() {
    var submitMapOptions = {
        center: new google.maps.LatLng(50.999497, -118.196411),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        panControl: false,
        streetViewControl: false
    };
    var submitMap = new google.maps.Map($("#submit_map")[0], submitMapOptions);

    google.maps.event.addListener(submitMap, 'click', function(event){
        google.maps.event.clearListeners(submitMap,'click');

        $('#latlong').val(event.latLng);

        var submitMarker = new google.maps.Marker({
            position: event.latLng,
            draggable: true
        });

        submitMarker.setMap(submitMap);

        google.maps.event.addListener( submitMarker, 'mouseup', function() {
            var latlong = submitMarker.getPosition();
            $('#latlong').val(latlong);
        });

    });


}
