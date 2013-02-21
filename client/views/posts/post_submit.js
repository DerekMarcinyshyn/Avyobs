Template.post_submit.rendered = function() {
    $('#date').datepicker();
    $('#time').timepicker();
    $('#setTimeButton').on('click', function() {
        $('#time').timepicker('setTime', new Date());

    });
}


Template.post_submit.events = {

}