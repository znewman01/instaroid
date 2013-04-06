/*
 * GET image
 */

var ImageProvider = require('../image-provider').ImageProvider;
var imageProvider = new ImageProvider();

exports.get = function(req, res) {
  var id = req.params[0];
  imageProvider.findById(id, function(err, image) {
    res.send(image);
  });
};
