/*
 * POST new image
 */
var ImageProvider = require('../image-provider').ImageProvider;
var imageProvider = new ImageProvider();
var fs = require('fs');

exports.upload = function(req, res){
  fs.readFile(req.files.image.path, function(err, data) {
    imageProvider.save(data, function(err, result) {
      res.send("okay");
    });
  });
}
