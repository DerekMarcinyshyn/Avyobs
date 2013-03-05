Template.post_page.helpers({
    post: function() {
        var obs = Posts.findOne(Session.get('selectedPostId'));
        return obs;
    },
    canView: function() {
        return true;
    }
});
