//routes
const express = require('express');
const router = express.Router();
const AuthCtrl = require('../controllers/auth.controller');


router.post('/register', AuthCtrl.CreateUser);

router.post('/req-reset-password', AuthCtrl.ResetPassword);
router.post('/valid-password-token', AuthCtrl.ValidPasswordToken);
router.post('/new-password', AuthCtrl.NewPassword);


module.exports = router;
