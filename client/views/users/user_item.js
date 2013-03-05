Template.user_item.rendered = function() {};

Template.user_item.helpers({
    createdAtFormatted: function() {
        return this.createdAt ? moment(this.createdAt).fromNow() : '-';
    },
    displayName: function() {
        return getDisplayName(this);
    },
    email: function() {
        return getEmail(this);
    },
    posts: function() {
        return Posts.find({'userId':this._id});
    },
    postsCount: function() {
        return Posts.find({'userId':this._id}).count();
    }
});