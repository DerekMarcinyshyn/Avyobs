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

// FIXME -- check all docs, not just the first one.
Meteor.startup(function () {
    Posts.allow({
        insert: function() {
            if (userId) {
                doc.userId = userId;
                return true;
            }
            return false;
        },
        update: function(userId, docs, fields, modifier) {
            if (docs[0].userId && docs[0].userId===userId) {
                return true;
            }
            throw new Meteor.Error(403, 'You do not have permission to edit this post');
            return false;
        },
        remove: function(userId, docs) {
            if (docs[0].userId && docs[0].userId===userId) {
                return true;
            }
            throw new Meteor.Error(403, 'You do not have permission to delete this post');
            return false;
        }
    });
});