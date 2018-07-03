var mongoose = require('mongoose');
var bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

// Server Schema
var ServerSchema = mongoose.Schema({
    type:{
        type: String,
        enum: ['inpaint','detection','gan'],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    // active:{
    //     type: Boolean,
    //     default: false       
    // }
});

var Server = module.exports = mongoose.model('Server', ServerSchema);

// create 
module.exports.createServer = (newServer, callback) => {
    newServer.save(callback);
};

// update server 
module.exports.updateServer = (id, server, callback) => {
    server.findByIdAndUpdate(id, server).exec((err, updated) => {
        callback(err);
    });
};