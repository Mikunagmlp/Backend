const localAuth = {};
const User = require('../models/usuario');

localAuth.isLogin = async (req, res) => {
    const { Email, Password } = req.body;
    console.log(Email, Password);

};

module.exports = localAuth;