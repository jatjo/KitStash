var util = require('util'),
    multiparty = require('multiparty'),
    fs = require('fs'),
    base64 = require('base64-stream'),
    Kit = require('mongoose').model('Kit'),
    ObjectId = require('mongoose').Schema.ObjectId,
    gridFS = require('../config/mongoose').GridFS;

exports.getKits = function(req, res) {
    Kit.find({}).exec(function(err, collection) {
        res.send(collection);
    });
};

exports.getKitById = function(req, res) {
    Kit.findOne({_id:req.params.id}).exec(function(err, kit) {
        res.send(kit);
    })
};

exports.uploadImage = function(req, res, next) {
  // TODO: use http://cnpmjs.org/package/gridfs-locking-stream
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    for (var idx = 0; idx < files.file.length; idx++) {
      var filename = files.file[idx].originalFilename;
      var tempPathAndFile = files.file[idx].path;

      var writestream = gridFS().createWriteStream({
        filename: filename,
        safe: true,
        mode: 'w'
      });

      writestream.on('close', function(file) {
        // Find kit and add file id (ie. image id) to kit
        Kit.findOne({_id:fields.kitId}).exec(function(err, kit) {
          if (err) { return next(err); }

          kit.fileIds.push(file._id);

          kit.save(function(err) {
            if (err) { return next(err); }
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write(JSON.stringify({'fileId' : fileId}));
            res.end();
          });
        })
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
};

exports.downloadImage = function(req, res, next) {
  // TODO: use http://cnpmjs.org/package/gridfs-locking-stream
  var imageId = req.param('imageId');
  gridFS()
    .createReadStream({
      _id: imageId
    })
    .pipe(base64.encode()).pipe(res);
};
