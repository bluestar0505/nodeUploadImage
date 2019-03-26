const User = require('../db/user');

function getLoginedUserData(req) {
    if(!isNaN(req.signedCookies.user_id)) {
        User.getOne(req.signedCookies.user_id).then(user => {
            if (user) {
                return user;
            } else {
                return false;
            }
        });
    } else {
        return false;
    }
}

module.exports = {
    getLoginedUserData,
}