const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Number,
    },
    score:{
        type:Number
    },
    level:{
        type:Number
    },
    branch:{
        type: String,
        required:true,
    },
    semester:{
        type: String,
        required:true,
    }
    
   
}, {
    timestamps:true
});


const User = mongoose.model('User', userSchema);

module.exports = User;