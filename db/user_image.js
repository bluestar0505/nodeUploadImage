
const knex = require('./connection');
const user_image_db = knex('user_image');

module.exports = {
  validateUploadImage: function (image) {
    const validFileName = typeof image.file_name == 'string' && image.file_name.trim() !='';
    const validLat = typeof image.lat == 'string' && image.lat.trim() != '';
    const validLng = typeof image.lng == 'string' && image.lng.trim() != '';
    return validFileName && validLat && validLng;
  },

  create: function(image,  user) {
    return images_db.insert(image, 'id').then(ids => {
      return ids[0];
    });
  },

}
