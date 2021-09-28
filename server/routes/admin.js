const express = require('express');
const router = express.Router();

const adminController = require('../controller/adminController')
const userController = require('../controller/userController')
router.post('/upload-viedo', userController.auth, adminController.uploadViedo)
router.post('/new-test', userController.auth, adminController.createTest)
router.post('/add-question',adminController.addQuestion)
router.post('/activate-test', userController.auth, adminController.activateTest)
router.post('/deactivate-test', userController.auth, adminController.deactivateTest)
router.post('/get-test-result',userController.auth, adminController.getTestResult)
router.post('/create-subject', userController.auth, adminController.createSubject)
router.get('/get-subject', userController.auth, adminController.getSubjects)
router.post('/make-admin', userController.auth, adminController.makeAdmin)
router.post('/remove-admin', userController.auth, adminController.removeAdmin)

module.exports = router;