const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = {
      _id: decoded._id,
      email: decoded.email,
    };

    return next();
  } catch (error) {
    console.log(error);
    return next(err);
  }
};

module.exports = jwtMiddleware;
