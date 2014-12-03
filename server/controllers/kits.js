var util = require('util'),
    multiparty = require('multiparty'),
    fs = require('fs'),
    base64 = require('base64-stream'),
    Kit = require('mongoose').model('Kit'),
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
    saveImage(req, res, function(kitId, fileId) {
        Kit.findOne({_id:kitId}).exec(function(err, kit) {
            if (err) { return next(err); }

            kit.fileIds.push(fileId);

            kit.save(function(err) {
                if (err) { return next(err); }
                res.writeHead(200, {'content-type': 'text/plain'});
                res.write('Upload success');
                res.end();
            });
        })
    });
};

saveImage = function(req, res, callback) {
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
};

exports.downloadImage = function(req, res, next) {
  // TODO: set content type based on file in gfs
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Access-Control-Allow-Origin': '*'
  });
  gridFS()
    .createReadStream({
      _id: req.param('imageId')
    })
    .pipe(base64.encode()).pipe(res);
};
