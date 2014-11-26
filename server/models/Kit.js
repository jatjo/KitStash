var mongoose = require('mongoose');

var kitSchema = mongoose.Schema({
    kitName: {type:String, required:'{PATH} is required!'},
    inStock: {type:Boolean, required:'{PATH} is required!'},
    aquiredDate: {type:Date, required:'{PATH} is required!'},
    tags: [String],
    fileIds: [String]
});

var Kit = mongoose.model('Kit', kitSchema);

function createDefaultKits() {
    Kit.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            Kit.create({kitName: 'Spirit of St. Louis', inStock: true, aquiredDate: new Date('10.05.2009'), tags: ['Airplane, Revell'], fileIds: []});
            Kit.create({kitName: '\'57 Chevy Coupé', inStock: true, aquiredDate: new Date('11.06.2008'), tags: ['Car, Revell'], fileIds: []});
            Kit.create({kitName: 'Nippon Maru', inStock: true, aquiredDate: new Date('12.07.2007'), tags: ['Ship, LEE'], fileIds: []});
            Kit.create({kitName: 'Ford Aeromax', inStock: false, aquiredDate: new Date('13.08.2006'), tags: ['Truck, Italeri'], fileIds: []});
            Kit.create({kitName: 'Black Thunder', inStock: true, aquiredDate: new Date('14.09.2005'), tags: ['Truck, Italeri'], fileIds: []});
            Kit.create({kitName: 'OV-10A Bronco', inStock: false, aquiredDate: new Date('15.11.2004'), tags: ['Airplane, Academy'], fileIds: []});
        }
    })
}

exports.createDefaultKits = createDefaultKits;