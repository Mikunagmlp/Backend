const express = require('express');
const router = express.Router();
const passportConfig = require('../passport/local-auth');
router.get('/', (req, res, next) => {
    res.send('Index');
});

router.post('/signin', passportConfig.isSignin);

router.get('/logout', (req, res, next) => {
    req.logout();
    res.send('Logout');
})



module.exports = router;
