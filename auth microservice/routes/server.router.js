const express = require('express');
const router = express.Router();
const Server = require('../models/Server');

// -------------------------------------------- get ----------------------------------
router.get('/', (req, res, next) => {
    Server
        .find({})
        .exec((err, servers) => {
            if (err) {
                next(err);
            }else{
                res.json({
                    data: servers,
                    status: 'success'
                });
            }
        });
});



// ---------------------------------- update -------------------------------------
router.put('/:id', (req, res, next) => {
    let {id} = req.params,
        server = req.body;
        Server.updateServer(id, server, (err) => {
            if (err) {
                next(err);
            } else {
                res.json({
                    data: server,
                    status: 'success'
                });
            }
        });
});

// ------------------------ add ---------------------------------------
router.post('/', function (req, res, next) {
        let server = req.body;
        Server.createServer(new Server(server), (err, saved) => {            
            if (err) {
                next(err);
            } else {
                res.json({
                    data: saved,
                    status: 'success'
                });
            }
        });
});



// ----------------------- delete -------------------
router.delete('/:id', (req, res, next) => {
    let {id} = req.params;
    Server
        .remove({
            _id: id
        })
        .exec((err, server) => {
            if (err) {
                next(err);
            } else {
                res.json({
                    data: server,
                    status: 'success'
                });
            }
        });
});

module.exports = router