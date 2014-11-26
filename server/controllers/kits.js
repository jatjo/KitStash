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

exports.uploadImage = function(req, res) {
    saveImage(req, res);
};