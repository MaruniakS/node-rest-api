const jwt = require('jsonwebtoken');

const AuthService = {
  verifyToken(req, res, next) {
    const token = req.headers.token;

    if (!token){
      return res.status(403).send({
        auth: false, message: 'No token provided.'
      });
    }

    jwt.verify(token, 'secret123', (err, decoded) => {
      if (err){
        return res.status(500).send({
          auth: false,
          message: 'Fail to Authentication. Error -> ' + err
        });
      }
      req.userId = decoded.id;
      next();
    });
  }
};

module.exports = AuthService;