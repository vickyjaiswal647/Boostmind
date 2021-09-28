const mongoose = require('mongoose');
const User = require('./user')
const attemptTestSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    testCode:{
        type:Number,
        required:true,
    },
    testScore:{
        type:Number,
        required:true,
    },
    semester:{
        
    }
   
}, {
    timestamps:true
});


const AttemptTest = mongoose.model('AttemptTest', attemptTestSchema);

module.exports = AttemptTest ;