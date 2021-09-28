const mongoose = require('mongoose');
const User = require('./user')
const subjectSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subjectName:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    semester:{
        type:String,
        required:true,
    },
    subjectCode:{
        type:String,
        required:true,  
    }
   
}, {
    timestamps:true
});


const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject ;