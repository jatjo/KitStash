var mongoose = require('mongoose'),
    fs = require('fs'),
    Grid = require('gridfs-stream'),
    multiparty = require('multiparty'),
    util = require('util'),
    userModel = require('../models/User'),
    kitModel = require('../models/Kit');

var gfs;

exports.setup = function(config) {
    mongoose.connect(config.db);
    var mongoConnection = mongoose.connection;
    mongoConnection.on('error', console.error.bind(console, 'connection error...'));
    mongoConnection.once('open', function callback() {
        console.log('kitstash db opened');
        gfs = Grid(mongoConnection.db, mongoose.mongo);
        console.log('Grid created');
    });

    userModel.createDefaultUsers();
    kitModel.createDefaultKits();
};

// TODO move to kits.js and make function to get gfs from this (mongoose.js) file.
exports.saveImage = function(req, res, callback) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    for (var idx = 0; idx < files.file.length; idx++) {
      var filename = files.file[idx].originalFilename;
      var tempPathAndFile = files.file[idx].path;

      var writestream = gfs.createWriteStream({
        filename: filename,
        safe: true,
        mode: 'w'
      });

      writestream.on('close', function(file) {
        callback(fields.kitId, file._id);
      });

      fs.createReadStream(tempPathAndFile)
        .on('error', function () {
          res.writeHead(500, {'content-type': 'text/plain'});
          res.write('upload failed:\n\n');
          res.end(util.inspect({fields: fields, files: files}));
        })
        .pipe(writestream);
    }
  });
}
