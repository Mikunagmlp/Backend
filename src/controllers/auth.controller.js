//controller
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/usuario');
const passwordResetToken = require('../models/resettoken');
module.exports = {
  async CreateUser(req, res) {
    const userEmail = await User.findOne({
      email: req.body.email
    });
    if (userEmail) {
      return res
        .status(409)
        .json({ message: 'Email already exist' });
    }

    const userName = await User.findOne({
      username: req.body.username
    });
    if (userName) {
      return res
        .status(409)
        .json({ message: 'Username already exist' });
    }

    return bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res
          .status(400)
          .json({ message: 'Error hashing password' });
      }
      const body = {
        username: req.body.username,
        email: req.body.email,
        password: hash
      };
      User.create(body)
        .then(user => {
          res
          res.status(201) .json({ message: 'User created successfully', user });
        })
        .catch(() => {
          res
            .status(500)
            .json({ message: 'Error occured' });
        });
    });
  },
  async ResetPassword(req, res) {
      if (!req.body.email) {
        return res.status(500).json({ message: 'Email is required' });
      }

      const user = await User.findOne({
        Email: req.body.email
      });

      if (!user) {
        return res.status(409).json({ message: 'Email does not exist' });
      }

      var resettoken = new passwordResetToken({ _userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });

      resettoken.save(function (err) {
          if (err) {
              return res.status(500).send({ msg: err.message });
          }

          passwordResetToken.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();

          res.status(200).json({ message: 'Reset Password successfully.' });

          var transporter = nodemailer.createTransport({
              service: 'Gmail', port: 465,
              auth: { user: 'xxxx@gmail.com', pass: 'xxxx' }
          });

          console.log(user.Email);

          var mailOptions = {
              to: user.Email,
              from: 'xxx@gmail.com',
              subject: 'Node.js Password Reset',
              text: 'Revisar bandeja de entrada\n\n' +
                  'ingrese a este enlace o copielo en su navegador:\n\n' +
                  'http://localhost:4200/recover-password' + '\n\n' +
                  'Copie el siguiente codigo donde corresponda: ' + resettoken.resettoken + '\n\n'
          }
          transporter.sendMail(mailOptions, (err, info) => {
          })
      })
  },

    async ValidPasswordToken(req, res) {
      if (!req.body.resettoken) {
          return res.status(500).json({ message: 'Token is required' });
      }

      try {
          const user = await passwordResetToken.findOne({ resettoken: req.body.resettoken });
          if (!user) {
              return res.status(409).json({ message: 'Invalid URL' });
          }

          const restoken = await passwordResetToken.findOne({ resettoken: req.body.resettoken })

          if (!restoken) {
              res.status(404).send('Unverified token!')
          }

          res.status(200).send({ message: 'Token valido!', value: true })

      } catch (e) {
          res.status(404).send(e);
      }

    },

    async NewPassword(req, res) {
      console.log(req.body.newpass);
      console.log(req.body.resettoken);

      try {
          const userToken = await passwordResetToken.findOne({ resettoken: req.body.resettoken });
          if (!userToken) {
              return res.status(409).send({ message: 'Token has expired' });
          }

          const userEmail = await User.findOne({ _id: userToken._userId });
          // console.log(userEmail);
          if (!userEmail) {
              return res.status(409).json({ message: 'Usuario no encontrado' });
          }

          let newPass = await bcrypt.hash(req.body.newpass, 10);

          // const newPass = await User.encryptPassword(req.body.newpass);
          // console.log(newPass);
          userEmail.Password = newPass;

          await userEmail.save();

          res.status(200).send(userEmail);
      } catch (e) {
          res.status(400).send(e);
      }
    }
}

