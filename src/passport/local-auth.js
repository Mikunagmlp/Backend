const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usuario');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signin', new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password',
    passReqToCallback: true
}, async (req, Email, Password, done) => {
    const user = await User.findOne({ Email: Email });
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'No user Found'));
    }
  
    if (!user.comparePassword(Password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
    }

    return done(null, user);
}));

exports.isAuthenticated = (req, res, next)=> {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
