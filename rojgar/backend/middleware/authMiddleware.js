const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(403).json({ success: false, message: 'Access Denied! No token provided.' });

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = verified;
    next(); 
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or Expired Token!' });
  }
};

module.exports = verifyAdmin;