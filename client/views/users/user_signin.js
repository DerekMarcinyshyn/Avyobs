Template.user_signin.events = {
    'click input[type=submit]': function(event) {
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        Meteor.loginWithPassword(username, password, function(err) {
            if(err) {
                console.log(err);
                throwError(err.reason);
            }
        });
    },

    'click .twitter-button': function() {
        Meteor.loginWithTwitter(function() {
            Meteor.Router.to('/submit');
        });
    },

    'click .facebook-button': function() {
        Meteor.loginWithFacebook(function() {
            Meteor.Router.to('/submit');
        });
    },

    'click .google-button': function() {
        Meteor.loginWithGoogle(function() {
            Meteor.Router.to('/submit');
        });
    }
};