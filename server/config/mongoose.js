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

exports.saveImage = function(req, res) {
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

      fs.createReadStream(tempPathAndFile)
        .on('end', function () {
          res.writeHead(200, {'content-type': 'text/plain'});
          res.write('received upload:\n\n');
          res.end(util.inspect({fields: fields, files: util.inspect(files)}));
        })
        .on('error', function () {
          res.writeHead(500, {'content-type': 'text/plain'});
          res.write('upload failed:\n\n');
          res.end(util.inspect({fields: fields, files: files}));
        })
        .pipe(writestream);
    }
  });
}