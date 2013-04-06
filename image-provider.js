var imageCounter = 1;

ImageProvider = function(){};

ImageProvider.prototype.dummyData = [];

ImageProvider.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0; i<this.dummyData.length; i++) {
    if(this.dummyData[i]._id == id) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

ImageProvider.prototype.findAll = function(callback) {
  callback(null, this.dummyData);
};

ImageProvider.prototype.save = function(images, callback) {
  var image = null;

  if(typeof(images.length)=="undefined")
        images = [images];

  for(var i =0; i< images.length; i++) {
    image = images[i];
    image._id = imageCounter++;
    image.created_at = new Date();

    this.dummyData[this.dummyData.length]= image;
  }
  callback(null, images);
};

new ImageProvider().save([
  {url: "/images/adi-logo.png"}
], function(error, images){});

new ImageProvider().findAll(function(error, images){});

exports.ImageProvider = ImageProvider;
