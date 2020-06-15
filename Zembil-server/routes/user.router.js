const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', userController.register);
router.get('/all', userController.getAll);
router.post('/authenticate', userController.authenticate);
router.get('/details', jwtHelper.verifyJwtToken, userController.userProfile);
router.get('/:userid', userController.getUserDetails);
router.get('/:role/:status', userController.getAllUsersByRoleAndStatus);
router.post('/:userid/:status', userController.changeUserStatus);
router.post('/:userid', userController.updateUserDetails);
module.exports = router;