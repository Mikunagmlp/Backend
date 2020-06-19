const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport/local-auth');
router.get('/', (req, res, next) => {
    res.send('Index');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/user/edit',
    failureRedirect: '/signin',
    passReqToCallback: true
}));
router.get('/logout', (req, res, next) => {
    req.logout();
    res.send('Logout');
})

router.get('/profile',passportConfig.isAuthenticated, (req, res, next) => {
    const user = req.user;
    console.log(user);
    res.json({
        status: 'ok',
        Email:user.Email,
    })
});

module.exports = router;
