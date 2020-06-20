const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport/local-auth');
router.get('/', (req, res, next) => {
    res.send('Index');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.send('Logout');
})



module.exports = router;
