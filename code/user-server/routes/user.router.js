const express = require('express');
const router = express.Router();
const User = require('../models/User');

// -------------------------------------------- get ----------------------------------
router.get('/', (req, res, next) => {
    User
        .find({})
        .exec((err, users) => {
            if (err) {
                next(err);
            }
            res.json({
                data: users,
                status: 'success'
            });
        });
});



// ---------------------------------- update -------------------------------------
router.put('/:id', (req, res, next) => {
    let {id} = req.params,
        user = req.body;
        User.updateUser(id, user, (err) => {
            if (err) {
                next(err);
            } else {
                res.json({
                    data: user,
                    status: 'success'
                });
            }
        });
});

// ------------------------ add ---------------------------------------
router.post('/', function (req, res, next) {
        user = req.body;
        User.createUser(new User(user), (err, saved) => {            
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
    User
        .remove({
            _id: id
        })
        .exec((err, user) => {
            if (err) {
                next(err);
            } else {
                res.json({
                    data: user,
                    status: 'success'
                });
            }
        });
});

module.exports = router