const express = require('express')
const router = express.Router()
const User = require('../models/User');



// ----------------- LOGIN ---------------------
router.post('/login', (req, res, next) => {
    let {email} = req.body, 
    {password} = req.body;
    
    User.auth( email , password ,  (err, isMatch , token) => {
        if(err){
            next(err);
        }else{
            if (isMatch) {
                res.json({
                    status: 'success',
                    message: 'logged in',
                    token
                });
            } else {
                return next({
                    message: 'Invalid email or password',
                    status: 400
                });
            }
        }
    });

});

// ----------------- LOGOUT ---------------------
router.get('/logout', (req, res, next) => {
    // for now logout is useless ..
    let token = req.header('x-token');
    if( token ){
        res.json({
            status:'success',
            message:'logged out'
        });
    }else{
        next();
    }
});


module.exports = router