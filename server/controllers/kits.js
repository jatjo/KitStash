var util = require('util'),
    Kit = require('mongoose').model('Kit'),
    saveImage = require('../config/mongoose').saveImage;

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

