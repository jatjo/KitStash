var Kit = require('mongoose').model('Kit');

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