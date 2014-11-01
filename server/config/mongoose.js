var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    kitModel = require('../models/Kit');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('kitstash db opened');
    });

    userModel.createDefaultUsers();
    kitModel.createDefaultKits();
};
