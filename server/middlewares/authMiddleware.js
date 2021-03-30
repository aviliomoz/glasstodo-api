const { request, response } = require('express');
const jwt = require('jsonwebtoken');

module.exports.verifyJWT = (req = request, res = response, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Token es obligatorio',
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        msg: 'Token inválido',
      });
    }

    res.locals.uid = decodedToken.id;
    next();
  });
};
