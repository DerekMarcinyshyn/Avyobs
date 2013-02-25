Session.set('initialLoad', true);

// Subscriptions

// ** Errors **

Errors = new Meteor.Collection(null);

// ** Users **
Meteor.subscribe('currentUser');
Meteor.subscribe('allUsers');


// ** Posts **
Posts = new Meteor.Collection('posts');