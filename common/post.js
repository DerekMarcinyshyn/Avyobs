Meteor.methods({
    post: function(post) {
        var user = Meteor.user();
        var userId = post.userId || user._id;
        var submitted = parseInt(post.submitted) || new Date().getTime();
        var postId = '';

        // check that the user can post
        if (!user || !canPost(user))
            throw new Meteor.Error(601, 'You need to login to post your observations.');

        post = _.extend(post, {
            userId          : userId,
            author          : getDisplayName(user),
            createdAt       : new Date().getTime(),
            submitted       : submitted
        });

        Posts.insert(post, function(error, result) {
            if (result) {
                postId = result;
                console.log('--- Posts.inserted --- postId: ' + result);
            }
        });

        post.postId = postId;
        return post;
    },

    post_edit: function(post) {
        //TODO: make post_edit server-side?
    }
});