const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const viedo_path = path.join('../client/src/uploads');
const viedoSchema = new mongoose.Schema({
    viedo:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },    
    semester:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    }
   
}, {
    timestamps:true
});


let storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', viedo_path));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()); 
    }
  });

//static method
viedoSchema.statics.uploadedViedo = multer ( {storage : storage}).single('viedo');
viedoSchema.statics.viedoPath = viedo_path;

const Viedo = mongoose.model('Viedo', viedoSchema);

module.exports = Viedo;