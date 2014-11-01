var Kit = require('mongoose').model('Kit');

exports.getKits = function(req, res) {
    Kit.find({}).exec(function(err, collection) {
        res.send(collection);
    });
};