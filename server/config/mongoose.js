var mongoose = require('mongoose'),
    Grid = require('gridfs-stream'),
    util = require('util'),
    userModel = require('../models/User'),
    kitModel = require('../models/Kit');

exports.GridFS = function() {
  return gfs;
};

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

