(function() {

    // do we need to flush the sessions
    Meteor.flush();

    post = function(id) {
        Session.set('selectedPostId', id);
        //return 'map';
        return 'post_page';
    };

    post_edit = function(id) {
        Session.set('selectedPostId', id);
        return 'post_edit';
    };


    // setup up routers
    Meteor.Router.add({
        '/'                 : 'home',
        '/404'              : 'not_found',
        '/submit'           : 'post_submit',
        '/map'              : 'map',
        '/users'            : 'users',
        '/account'          : 'user_edit',
        '/forgot_password'  : 'user_password',
        '/users/:id'        : 'user_profile',
        '/users/:id/edit'   : 'user_edit',
        '/signin'           : 'user_signin',
        '/signup'           : 'user_signup',
        '/posts/:id'        : post,
        '/posts_list'       : 'posts_list'
    });

    Meteor.Router.filters({
        requireLogin: function(page) {
            if (Meteor.loggingIn()) {
                return 'loading';
            } else if (Meteor.user()) {
                return page;
            } else {
                return 'user_signin';
            }
        },

        canEdit: function(page) {
            var error = canEdit(Meteor.user(), item, true);
            if (error === true)
                return page;

            // a problem...make sure the item has loaded and we have logged in
            if (!item || Meteor.loggingIn())
                return 'loading';

            // otherwise the error tells us what to show.
            return error;
        },

        canPost: function(page) {
            var error = canPost(Meteor.user(), true);
            if (error === true)
                return page;

            // a problem...make sure we are logged in
            if (Meteor.loggingIn())
                return 'loading';

            // otherwise the error tells us what to show
            return 'user_signin';
        },

        isLoggedOut: function(page) {
            return Meteor.user() ? 'already_logged_in' : page;
        },

        requireProfile: function(page) {
            var user = Meteor.user();

            if (user && ! Meteor.loggingIn() && ! userProfileComplete(user)) {
                Session.set('selectUserId', user.id);
                return 'user_email';
            } else {
                return page;
            }
        },

        requirePost: function(page) {
            if (Posts.findOne(Session.get('selectedId'))) {
                return page;
            } else if (! Session.get('postReady')) {
                return 'loading';
            } else {
                return 'not_found';
            }
        }

    });

    // filter rules
    Meteor.Router.filter('requireProfile');
    //Meteor.Router.filter('requireLogin', {only: ['post_submit']});
    //Meteor.Router.filter('isLoggedOut', {only: ['user_signin', 'user_signup']});
    Meteor.Router.filter('canPost', {only: ['post_submit']});
    Meteor.Router.filter('canEdit', {only: ['post_edit']});
    Meteor.Router.filter('requirePost', {only: ['post_edit']});


    Meteor.startup(function() {
        Meteor.autorun(function () {
            // grab the current page from the router, so this re-runs every time it changes
            Meteor.Router.page();

            if (Meteor.Router.page() === null) {
                Meteor.Router.to('/404');
            }

            if (Meteor.Router.page() !== "loading") {
                console.log('------ '+Meteor.Router.page()+' ------');

                clearSeenErrors();
            }

        });
    });
}());