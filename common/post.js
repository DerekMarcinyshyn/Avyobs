Meteor.methods({
    post: function(post) {
        var user = Meteor.user();
        var userId = post.userId || user._id;
        var submitted = parseInt(post.submitted) || new Date().getTime();
        var postId = '';
        var location = post.location;
        var latLng = post.latLng;
        var date = post.date;
        var time = post.time;
        var temp = post.temp;
        var tempMeasured = post.tempMeasured;

        // todo: grab more variables
        /*
            latLng:         latLng,
            date:           date,
            time:           time,
            temp:           temp,
            tempMeasured:   tempMeasured,
            wind:           wind,
            windSpeed:      windSpeed,
            snowSurface:    snowSurface,
            footPen:        footPen,
            newSnow:        newSnow,
            aviCause:       aviCause,
            aviAmount:      aviAmount,
            aviSize:        aviSize,
            aviAspect:      aviAspect,
            aviElevation:   aviElevation,
            aviDepth:       aviDepth,
            comments:       comments
        */

        // check that the user can post
        if (!user || !canPost(user))
            throw new Meteor.Error(601, 'You need to login to post your observations.');


        post = _.extend(post, {
            userId          : userId,
            author          : getDisplayName(userId),
            createdAt       : new Date().getTime(),
            submitted       : submitted,
            location        : location,
            latLng          : latLng,
            date            : date,
            time            : time,
            temp            : temp,
            tempMeasured    : tempMeasured
        });


        Posts.insert(post, function(error, result) {
            if (result) {
                postId = result;
                console.log('--- yes it worked ---');
                console.log('--- Posts.inserted --- result: ' + result);
            }
        });

        post.postId = postId;
        return post;
    },

    post_edit: function(post) {
        //TODO: make post_edit server-side?
    }
});