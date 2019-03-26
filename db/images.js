const knex = require('./connection');
const images_db = knex('images');

module.exports = {
  validateUploadImage: function (image) {
    const validFileName = typeof image.file_name == 'string' && image.file_name.trim() !='';
    const validLat = typeof image.lat == 'string' && image.lat.trim() != '';
    const validLng = typeof image.lng == 'string' && image.lng.trim() != '';
    return validFileName && validLat && validLng;
  },

  create: function(image) {
    return images_db.insert(image, 'id').then(ids => {
      return ids[0];
    });
  },

  getByUser: function(id){
    return images_db.where('user_id', id);
  },

  getAllImagesByPosition: function(lat, lng){
    return images_db.where(function() {
      this.where('lat', '>=', lat - 2);
      this.where('lat', '<=', lat + 2);
    }).andWhere(function() {
      this.where('lng', '>=', lng - 2);
      this.where('lng', '<=', lng + 2);
    });
  },

  getAllImages: function() {
    return images_db.select();
  },
}
