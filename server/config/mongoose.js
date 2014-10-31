var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('kitstash db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'jatjo');
            User.create({firstName:'Jan Terje', lastName:'Johansen', username:'jatjo', salt: salt, hashed_pwd: hash, roles: ['admin']});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'linda');
            User.create({firstName:'Linda', lastName:'Fahle-Johansen', username:'linda', salt: salt, hashed_pwd: hash, roles: []});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'erik');
            User.create({firstName:'Erik', lastName:'Fahle-Johansen', username:'erik', salt: salt, hashed_pwd: hash});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'eskil');
            User.create({firstName:'Eskil', lastName:'Fahle-Johansen', username:'eskil', salt: salt, hashed_pwd: hash});
        }
    });
}
