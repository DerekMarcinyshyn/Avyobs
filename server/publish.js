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

// full set of posts
Meteor.publish('posts', function() {
    return Posts.find();
});

Meteor.publish('paginatedPosts', function(find, options, limit) {
    options = options || {};
    options.limit = limit;

    return Posts.find(find || {}, options);
});

// FIXME -- check all docs, not just the first one.
Meteor.startup(function () {
    Posts.allow({
        insert: function(userId, doc) {
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