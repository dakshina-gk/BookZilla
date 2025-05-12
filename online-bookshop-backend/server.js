require('dotenv').config();
console.log('DEBUG MONGO_URI:', process.env.MONGO_URI); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();



app.use((req, res, next) => {
  if (req.originalUrl === '/api/checkout/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(helmet());

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

try {
  app.use('/api/auth', require('./routes/auth'));
} catch (err) {
  console.error('Error in /api/auth routes:', err);
}

try {
  app.use('/api/books', require('./routes/books'));
} catch (err) {
  console.error('Error in /api/books routes:', err);
}

try {
  app.use('/api/cart', require('./routes/cart'));
} catch (err) {
  console.error('Error in /api/cart routes:', err);
}

try {
  app.use('/api/checkout', require('./routes/checkout'));
} catch (err) {
  console.error('Error in /api/checkout routes:', err);
}

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ 
    error: 'Server Error', 
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
