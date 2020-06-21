const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport/local-auth');
const { isLogin } = require('../passport/localAuth');
router.get('/', (req, res, next) => {
    res.send('Index');
});

router.post('/signin', isLogin);

router.get('/logout', (req, res, next) => {
    req.logout();
    res.send('Logout');
})



module.exports = router;
