const { request, response } = require('express');
const jwt = require('jsonwebtoken');

module.exports.verifyJWT = (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Token es obligatorio',
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decodedPayload) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        msg: 'Token inválido',
      });
    }

    req.uid = decodedPayload.uid;

    next();
  });
};
