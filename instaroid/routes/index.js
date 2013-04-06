
/*
 * GET home page.
 */
var ImageProvider = require('../image-provider').ImageProvider;
var imageProvider = new ImageProvider()

exports.index = function(req, res){
  imageProvider.findAll(function(error, images) {
    var groupedImages = [];
    for (i = 0; i < images.length; i++) { // I AM SO SORRY FOR WRITING THIS
      if (i % 3 == 0) {
        groupedImages.push([images[i]]);
      } else if (i % 3 == 1) {
        groupedImages[groupedImages.length-1] = [images[i-1],images[i]];
      } else {
        groupedImages[groupedImages.length-1] = [images[i-2],images[i-1],images[i]];
      }
    }
    console.log(groupedImages);
    res.render('index', { title: 'Instaroids', rows: groupedImages });
  });
};
