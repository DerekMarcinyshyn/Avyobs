Template.post_submit.helpers({
    users: function() {
        return Meteor.users.find();
    },
    userName: function() {
        return getDisplayName(this);
    },
    isSelected: function() {
        var post = Posts.findOne(Session.get('selectedPostId'));
        return post && this._id == post.userId;
    }
});

Template.post_submit.rendered = function() {
    Session.set('selectedPostId', null);

    $('#date').datepicker();
    $('#time').timepicker();
    $('#setTimeButton').on('click', function() {
        $('#time').timepicker('setTime', new Date());
    });

    // add map
    submitMapInitialize();

    // show avalanche observations
    $('#showAvi').click(function() {
        $('#seeAvi').slideToggle(this.checked);
    });
}

Template.post_submit.events = {

    'click input[type=submit]':function(e, instance) {
        e.preventDefault();

        $(e.target).addClass('disabled');

        var isSubmitFormValid = true;

        $('.required').each(function() {
            if ($.trim($(this).val()).length == 0) {
                // do not post
                isSubmitFormValid = false;
                $(this).addClass('highlight');
                $(e.target).removeClass('disabled');
                $('.submitMessage').show().html('Sorry you have required fields.');
                $('html,body').delay(2000).animate({scrollTop:0}, 'slow');

            } else {
                // post to database
                $(this).removeClass('highlight');
            }
        });

        if (isSubmitFormValid) {
            // grab the variables from the post_submit form
            var location = $('#location').val();
            var latLng = $('#latLng').val();
            var date = $('#date').val();
            var time = $('#time').val();
            var temp = $('#temp').val();
            var tempMeasured = $('input:radio[name=tempMeasure]:checked').val();
            var wind = $('select#wind option:selected').val();
            var windSpeed = $('select#windSpeed option:selected').val();
            var snowSurface = $('select#snowSurface option:selected').val();
            var footPen = $('select#footPen option:selected').val();
            var newSnow = $('select#newSnow option:selected').val();
            var aviCause = $('select#aviCause option:selected').val();
            var aviAmount = $('select#aviAmount option:selected').val();
            var aviSize = $('select#aviSize option:selected').val();
            var aviAspect = $('select#aviAspect option:selected').val();
            var aviElevation = $('select#aviElevation option:selected').val();
            var aviDepth = $('select#aviDepth option:selected').val();
            var comments = $('#comments').val();

            var properties = {
                location:       location,
                latLng:         latLng,
                date:           date,
                time:           time,
                temp:           temp,
                tempMeasured:   tempMeasured,
                wind:           wind,
                windSpeed:      windSpeed,
                snowSurface:    snowSurface,
                footPen:        footPen,
                newSnow:        newSnow,
                aviCause:       aviCause,
                aviAmount:      aviAmount,
                aviSize:        aviSize,
                aviAspect:      aviAspect,
                aviElevation:   aviElevation,
                aviDepth:       aviDepth,
                comments:       comments
            };

            console.log(properties);

            // post to database
            Meteor.call('post', properties, function(error, post) {
                if (error) {
                    throwError(error.reason);
                    clearSeenErrors();
                    $(e.target).removeClass('disabled');
                    console.log(error.details);
                } else {
                    // navigate to the map
                    Meteor.Router.to('/posts/' + post.postId);
                }

            });
        }
    }
};

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

        $('#latLng').val(event.latLng);

        var submitMarker = new google.maps.Marker({
            position: event.latLng,
            draggable: true
        });

        submitMarker.setMap(submitMap);

        google.maps.event.addListener( submitMarker, 'mouseup', function() {
            var latLng = submitMarker.getPosition();
            $('#latLng').val(latLng);
        });
    });
}