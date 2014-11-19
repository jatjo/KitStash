var multiparty = require('multiparty'),
    util = require('util'),
    Kit = require('mongoose').model('Kit');

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
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        console.log(util.inspect(files));
        res.end(util.inspect({fields: fields, files: files}));
    });

/*    var size = '';
    var fileName = '';
    form.on('part', function(part){
        if(!part.filename) return;
        size = part.byteCount;
        fileName = part.filename;
    });
    form.on('file', function(name,file){
        console.log(file.path);
        console.log(__dirname);
        console.log('filename: ' + fileName);
        console.log('fileSize: '+ (size / 1024));
/*        var tmp_path = file.path
        var target_path = __dirname + '/uploads/fullsize/' + fileName;
        var thumbPath = __dirname + '/uploads/thumbs/';
        fs.renameSync(tmp_path, target_path, function(err) {
            if(err) console.error(err.stack);
        });
        res.redirect('/uploads/fullsize/' + fileName);
        console.log(target_path);
        /*gm(tmp_path)
         .resize(150, 150)
         .noProfile()
         .write(thumbPath + 'small.png', function(err) {
         if(err) console.error(err.stack);
         });*/
  /*  });
    form.parse(req);*/
};