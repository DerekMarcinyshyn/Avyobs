
// Permissions

// user:                Defaults to Meteor.user()
// returnError:         If there's an error, should we return what the problem is?
//
// return true if all is well, false || an error string if not
canView = function(user, returnError){
    var user=(typeof user === 'undefined') ? Meteor.user() : user;

    // console.log('canView', 'user:', user, 'returnError:', returnError, getSetting('requireViewInvite'));

    if(Meteor.isClient && !Session.get('settingsLoaded'))
        return false;

    if(getSetting('requireViewInvite') === true){
        if(!user){
            return returnError ? "no_account" : false;
        }else if(isAdmin(user) || user.isInvited){
            return true;
        }else{
            return returnError ? "no_invite" : false;
        }
    }else{
        return true;
    }
}
canPost = function(user, returnError){
    var user = (typeof user === 'undefined') ? Meteor.user() : user;

    //console.log('canPost', user);

    if(!user){
        return returnError ? "no_account" : false;
    } else {
        return true;
    }
}
canEdit = function(user, item, returnError){
    var user=(typeof user === 'undefined') ? Meteor.user() : user;

    if (!user || !item){
        return returnError ? "no_rights" : false;
    } else if (isAdmin(user)) {
        return true;
    } else if (user._id!==item.userId) {
        return returnError ? "no_rights" : false;
    }else {
        return true;
    }
}