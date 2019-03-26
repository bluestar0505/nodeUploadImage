const knex = require('./connection');

module.exports = {
  getOne: function (id) {
    return knex('user').where('id', id).first();
  },
  
  getOneByEmail: function(email) {
    return knex('user').where('email', email).first();
  },

  validateSigninUser: function (user) {
      const validEmail = typeof user.email == 'string' && user.email.trim() !='';
      const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;
      return validEmail && validPassword;
  },

  validateSignupUser: function (user) {
    const validEmail = typeof user.email == 'string' && user.email.trim() !='';
    const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;
    const validConfirmPassword = user.password == user.confirm_password;
    return validEmail && validPassword && validConfirmPassword;
  },

  create: function(user) {
    return knex('user').insert(user, 'id').then(ids => {
      return ids[0];
    });
  },

  updateRating: function(userImages) {
    if(userImages.thumb == 1) {
      return knex('user').where('id', userImages.user_id).update({
        'rating': knex.raw('rating + 1'),
      });
    } else {
      return knex('user').where('id', userImages.user_id).update({
        'rating': knex.raw('rating - 1'),
      });
    }
  },
}
    