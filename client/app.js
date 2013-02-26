Session.set('initialLoad', true);

// HELPERS
clearSeenErrors = function() {
    Errors.update({seen:true}, {$set: {show:false}}, {multi:true});
};


// Subscriptions

// ** Errors **
// Local (client-only) collection

Errors = new Meteor.Collection(null);

// ** Users **
Meteor.subscribe('currentUser');
Meteor.subscribe('allUsers');


// ** Posts **
Posts = new Meteor.Collection('posts');