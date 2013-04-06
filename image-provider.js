var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    Grid = require('mongodb').Grid,
    ObjectID = require('mongodb').ObjectID;

var mongo_db = process.env.MONGO_DB || 'instaroid';
var mongo_host = process.env.MONGO_HOST || 'localhost';
var mongo_port = process.env.MONGO_PORT || 27017;

var imageCounter = 1;

ImageProvider = function(){};

ImageProvider.prototype.findAll = function(callback) {
  var db = new Db(mongo_db, new Server(mongo_host, mongo_port), {w: -1});
  db.open(function(err, db) {
    var collection = db.collection("images");
    collection.distinct("image_id", function(err, ids) {
      db.close();
      callback(null, ids.map(function(id) { return id + ".png"; }));
    });
  });
};

ImageProvider.prototype.findById = function(id, callback) {
  var db = new Db(mongo_db, new Server(mongo_host, mongo_port), {w: -1});
  db.open(function(err, db) {
    var grid = new Grid(db, "fs");
    grid.get(ObjectID(id), function(err, image) {
      db.close();
      callback(null, image);
    });
  });
};

ImageProvider.prototype.save = function(image, callback) {
  var db = new Db(mongo_db, new Server(mongo_host, mongo_port), {w: -1});
  db.open(function(err, db) {
    var grid = new Grid(db, "fs");
    grid.put(image, {}, function(err, result) {
      var collection = db.collection("images");
      collection.insert({image_id: result._id},
        function(err, result) {
      db.close();
      callback(null, result);
      });
    });
  });
};

exports.ImageProvider = ImageProvider;
