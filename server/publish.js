Meteor.publish('currentUser', function() {
    return Meteor.users.find(this.userId);
});

Meteor.publish('allUsers', function() {
    return Meteor.users.find();
});

// Posts

Posts = new Meteor.Collection('posts');

// a single post, identified by id
Meteor.publish('post', function(id) {
    return Posts.find(id);
});