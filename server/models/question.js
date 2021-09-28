const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    qStatement:{
        type:String,
        required:true,
    },
    option1:{
        type:String,
        required:true,
    },
    option2:{
        type:String,
        required:true,
    },
    option3:{
        type:String,
        required:true,
    },
    option4:{
        type:String,
        required:true,
    },
    correctAnswer:{
        type:String,
        required:true,
    },
   
}, {
    timestamps:true
});


const Question = mongoose.model('Question', questionSchema);

module.exports = Question;