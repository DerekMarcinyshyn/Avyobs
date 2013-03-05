Template.post_page.helpers({
    post: function() {
        var post = Posts.findOne(Session.get('selectedPostId'));
        console.log(post);
        return post;
    }
});