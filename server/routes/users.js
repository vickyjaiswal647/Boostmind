const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.post('/sign-up', userController.generateOTP);
router.post('/create', userController.verifyOTP, userController.create);
router.post('/sign-in', userController.signIn)

router.get('/profile',userController.auth, userController.profile)

router.use('/admin', require('./admin'));
router.use('/student', require('./student'));
module.exports = router;