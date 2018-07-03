const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const middlewares = require('./middlewares');
const user = require('./routes/user.router');
const server = require('./routes/server.router');
const auth = require('./routes/auth.router');
const loadbalancer = require('./loadbalancer');

// Db connection
mongoose.Promise = global.Promise;
mongoose.connect( keys.db ).then(() =>{
    console.log('Connected');
}).catch((err)=>{
    if(err) throw err;
    console.log('Connection error');
});

var app = express();

app.use( '/' , middlewares.CROS);
app.use( '/' , middlewares.bodyParse);
app.use( '/' , middlewares.urlencodedParser);
app.use( '/' , middlewares.removePowered);


// ----------------------- AUTH ROUTES ------------------
app.use('/', auth);

// ----------------------- USER ROUTES ------------------
app.use('/user' , middlewares.isAdmin  , user)
app.use('/server' , middlewares.isAdmin  , server)

app.use('/service' , loadbalancer );

// --- ---------- ------------ --------------- -------- // 
app.use( '/' , middlewares.handleErrors);
app.use( '/' , middlewares.handle404);
app.use( '/' , middlewares.handle500);
// --- ---------- ------------ --------------- -------- // 


app.listen(3000);