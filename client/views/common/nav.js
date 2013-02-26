Template.nav.events = {
    'click #logout': function(event) {
        event.preventDefault();
        Meteor.logout();
    },
    'click .login-header': function(e) {
        e.preventDefault();
        Meteor.Router.to('/account');
    }
};

Template.nav.rendered = function() {
    if (!Meteor.user()) {
        $('.login-link-text').text('Sign Up/Sign In');
    } else {
        $('#login-buttons-logout').before('<a href="/account" class="account-link btn btn-success">My Account</a>');
    }
};