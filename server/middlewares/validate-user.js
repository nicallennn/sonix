const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');
const SECRET = process.env.SECRET;

const validateUser = async (req, res, next) => {
  // extract token from auth headers
  const authHeaders = req.headers['authorization'];

  if (!authHeaders) {
    return res.status(403).send({ message: 'No token found!' });
  }
  const token = authHeaders.split(' ')[1];

  try {
    // verify & decode token payload,
    const { _id } = jwt.verify(token, SECRET);
    // attempt to find user object and set to req
    const user = await User.findById({ _id });
    if (!user) return res.status(401).send({ message: 'User not found' });
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = validateUser;