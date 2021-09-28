const express = require('express');
const router = express.Router();




const homeController = require('../controller/homeController')
const userController = require('../controller/userController');


router.get('/',userController.profile);


router.use('/users', require('./users'));




module.exports = router;