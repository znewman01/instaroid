
/*
 * GET home page.
 */
var ImageProvider = require('../image-provider').ImageProvider;
var imageProvider = new ImageProvider()

exports.index = function(req, res){
  imageProvider.findAll(function(error, images) {
    res.render('index', { title: 'Express', images: images });
  });
};
