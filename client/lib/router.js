// setup up routers
Meteor.Router.add({
    '/'             : 'home',
    '/submit/'      : 'post_submit',
    '/map/'         : 'map'
});


Meteor.startup(function() {
    Meteor.autorun(function () {
        // grab the current page from the router, so this re-runs every time it changes
        Meteor.Router.page();

    });
});