getDisplayName = function(user) {
    return (user.profile && user.profile.name) ? user.profile.name : user.username;
}

getDisplayNameById = function(user) {
    return getDisplayName(Meteor.user.findOne(userId));
}

getSignupMethod = function(user) {
    if (user.services && user.services.twitter) {
        return 'twitter';
    } else {
        return 'regular';
    }
}

getEmail = function(user) {
    if (getSignupMethod(user)== 'twitter') {
        return user.profile.email;
    } else if (user.emails) {
        return user.emails[0].address || user.emails[0].email;
    } else if (user.profile && user.profile.email) {
        return user.profile.email;
    } else {
        return;
    }
}

getCurrentUserEmail = function() {
    return Meteor.user() ? getEmail(Meteor.user()) : '';
}

userProfileComplete = function(user) {
    return !!getEmail(user);
}