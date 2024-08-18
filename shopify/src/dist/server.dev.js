"use strict";

var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var cors = require('cors');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');

require('dotenv').config();

var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/auth-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('MongoDB connected');
})["catch"](function (err) {
  return console.error('MongoDB connection error:', err);
});
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
var User = mongoose.model('User', UserSchema);
app.post('/api/register', function _callee(req, res) {
  var _req$body, email, password, existingUser, hashedPassword, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: 'Email already exists'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 9:
          hashedPassword = _context.sent;
          user = new User({
            email: email,
            password: hashedPassword
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          res.status(201).json({
            message: 'User registered'
          });
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          console.error('Error registering user:', _context.t0);
          res.status(500).json({
            error: 'Server error'
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 16]]);
});
app.post('/api/login', function _callee2(req, res) {
  var _req$body2, email, password, user, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;
          _context2.t0 = user;

          if (!_context2.t0) {
            _context2.next = 10;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          _context2.t0 = _context2.sent;

        case 10:
          if (!_context2.t0) {
            _context2.next = 15;
            break;
          }

          token = jwt.sign({
            email: user.email
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          res.status(200).json({
            token: token
          });
          _context2.next = 16;
          break;

        case 15:
          res.status(400).json({
            error: 'Invalid credentials'
          });

        case 16:
          _context2.next = 22;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t1 = _context2["catch"](1);
          console.error('Error logging in:', _context2.t1);
          res.status(500).json({
            error: 'Server error'
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 18]]);
});
app.post('/api/forgot-password', function _callee3(req, res) {
  var email, user, resetToken, transporter, mailOptions;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          email = req.body.email;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context3.sent;

          if (user) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));

        case 7:
          resetToken = jwt.sign({
            email: user.email
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });
          mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            text: "To reset your password, please use the following token: ".concat(resetToken)
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.error('Error sending email:', error);
              return res.status(500).json({
                error: 'Failed to send email'
              });
            }

            console.log('Email sent:', info.response);
            res.status(200).json({
              message: 'Password reset link sent'
            });
          });
          _context3.next = 17;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](1);
          console.error('Server error:', _context3.t0);
          res.status(500).json({
            error: 'Server error'
          });

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 13]]);
});
app.post('/api/reset-password', function _callee4(req, res) {
  var _req$body3, token, password, decoded, email, user, hashedPassword;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, token = _req$body3.token, password = _req$body3.password;

          if (!(!token || !password)) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: 'Token and new password are required'
          }));

        case 3:
          _context4.prev = 3;
          // Print the token to debug
          console.log('Reset token:', token); // Verify the token

          decoded = jwt.verify(token, process.env.JWT_SECRET);
          email = decoded.email;
          console.log(email);
          console.log('Decoded token data:', decoded); // Find the user

          _context4.next = 11;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 11:
          user = _context4.sent;

          if (user) {
            _context4.next = 14;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));

        case 14:
          _context4.next = 16;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 16:
          hashedPassword = _context4.sent;
          // Update the user's password
          user.password = hashedPassword;
          _context4.next = 20;
          return regeneratorRuntime.awrap(user.save());

        case 20:
          res.status(200).json({
            message: 'Password reset successful'
          });
          _context4.next = 33;
          break;

        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](3);
          console.error('Error resetting password:', _context4.t0);

          if (!(_context4.t0.name === 'TokenExpiredError')) {
            _context4.next = 30;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: 'Token has expired'
          }));

        case 30:
          if (!(_context4.t0.name === 'JsonWebTokenError')) {
            _context4.next = 32;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: 'Invalid token'
          }));

        case 32:
          res.status(400).json({
            error: 'Invalid or expired token'
          });

        case 33:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 23]]);
});
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});