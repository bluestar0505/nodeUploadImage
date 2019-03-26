const express = require('express');
const router = express.Router();
const User = require('../db/user');
const Image = require('../db/images');
const UserImage = require('../db/user_image');


/* get images by position*/
router.get('/get_images/:lat/:lng', function(req, res, next) {
    // Image.getAll().then(images => {
    //     console.log(images);
    // });
    Image.getAllImagesByPosition(parseFloat( req.params.lat), parseFloat(req.params.lng)).then(images => {
        res.json({ 
            images: images,
          });
    });
});

router.get('/thumb/:type/:image/:user', function(req, res, next) {
    const userImage = {
        thumb: req.params.type,
        user_id: req.params.user,
        image_id: req.params.image,
    };
    //UserImage.create(userImage).then(userImages => {
        User.updateRating(userImage).then(userImages => {
            res.json({ 
                status: 'success',
                message: "Thumb Action Success! ",
            });
        });
    //});
});

/* get all images. */
router.get('/get_all_images', function(req, res, next) {
    Image.getAllImages().then(images => {
        res.json({ 
            images: images,
          });
    });
});

module.exports = router;
