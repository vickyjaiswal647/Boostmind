const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/boostMind');
const db =mongoose.connection;

//if not connected to db
db.on('error', console.error.bind(console, 'Database connection not establised'));

//if connection is established

db.once('open', function(){
    console.log('Database connection establised successfully');
    return;
});

module.exports =db;