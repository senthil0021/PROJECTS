const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/auth-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `To reset your password, please use the following token: ${resetToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email' });
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Password reset link sent' });
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/reset-password', async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  try {
    // Print the token to debug
    console.log('Reset token:', token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
  console.log(email);
    console.log('Decoded token data:', decoded);

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Error resetting password:', err);

    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({ error: 'Token has expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(400).json({ error: 'Invalid token' });
    }
    
    res.status(400).json({ error: 'Invalid or expired token' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
