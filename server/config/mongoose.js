var mongoose = require('mongoose');

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
        username: String
    });
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if (collection.length === 0) {
            User.create({firstName:'Jan Terje', lastName:'Johansen', username:'jatjo'});
            User.create({firstName:'Linda', lastName:'Fahle-Johansen', username:'linda'});
            User.create({firstName:'Erik', lastName:'Fahle-Johansen', username:'erik'});
            User.create({firstName:'Eskil', lastName:'Fahle-Johansen', username:'eskil'});
        }
    })
}