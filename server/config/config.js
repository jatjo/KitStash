var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/kitstash',
        rootPath: rootPath,
        port: process.env.PORT | 3030
    },
    production: {
        db: 'mongodb://kitstash:kitstash@ds049130.mongolab.com:49130/kitstash',
        rootPath: rootPath,
        port: process.env.PORT | 80
    }
}