Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile || {};

    if (options.email)
        user.profile.email = options.email;

    if (user.profile.email)
        user.email_hash = CryptoJS.MD5(user.profile.email.trim().toLowerCase()).toString();

    if (!user.profile.name)
        user.profile.name = user.username;

    if (user.username==='Derek')
        user.isAdmin = true;

    return user;
});

Meteor.Profiler.allow = function(userId) {
    var user = Meteor.users.findOne(userId);
    return user && user.isAdmin;
};