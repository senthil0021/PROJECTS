const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect('mongodb://127.0.0.1:27017/auth-db')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Product Schema
const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String
});

const Product = mongoose.model('Product', ProductSchema);

// Register route
app.post('/register', async (req, res) => {
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
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Missing email or password');
  }

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Profile route
app.get('/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secret', async (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      const user = await User.findOne({ email: decoded.email });
      if (user) {
        res.json({ email: user.email });
      } else {
        res.sendStatus(404);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// Products route
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
