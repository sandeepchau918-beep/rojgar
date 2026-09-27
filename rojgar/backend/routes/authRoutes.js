const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ id: 'admin123' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ success: true, token, message: 'Login Successful!' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid Username or Password!' });
  }
});

module.exports = router;