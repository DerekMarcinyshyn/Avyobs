// Posts

Posts = new Meteor.Collection('posts');

// a single post, identified by id
Meteor.publish('post', function(id) {
    return Posts.find(id);
});