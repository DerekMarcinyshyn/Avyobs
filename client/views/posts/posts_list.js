Template.posts_list.helpers({
    posts: function() {
        var list = Posts.find();
        return list;
    }
});