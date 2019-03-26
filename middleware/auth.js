function ensureLoggedIn(req, res, next) {
    if(req.signedCookies.user_id) {
        next();
    } else {
        res.status(401);
        next(new Error('Un-Authorized'));
    }
}

// function allowAccess(req, res, next) {
//     console.log(req.signedCookies);
//     console.log(req.params);

//     if(req.signedCookies.user_id == req.params.id) {
//         next();
//     } else {
//         res.status(401);
//         next(new Error('Un-Authorized'));
//     }
// }

module.exports = {
    ensureLoggedIn,
    //allowAccess
}