const express = require('express');
//const bp = require("body-parser");
const app = express();
const port = 8000;
const db = require('./connection/mongoose');
const cors = require('cors');
// // app.use(express.json({limit: '25mb'}));
// // app.use(express.urlencoded({limit: '25mb'}));

// app.use(
//     express.urlencoded({
//       extended: true
//     })
//   )
  
app.use(express.json())

var bodyParser = require("body-parser");
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('assests'));
app.use(cors());
app.options('*', cors());




app.use('/', require('./routes/index'));
app.listen(port, function(err){
    if(err){
        console.log('Error in running the server');
        return;
    }
    console.log(`Server is running on port ${port}`);
});