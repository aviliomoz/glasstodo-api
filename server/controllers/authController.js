const { request, response } = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createJWT = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 3,
  });
};

module.exports.signin = async (req = request, res = response) => {
  const { name, lastname, email, password } = req.body;

  try {
    const user = await User.create({ name, lastname, email, password });

    const token = createJWT(user._id);
    res.cookie('jwt', token, {
      maxAge: 60 * 60 * 24 * 3 * 1000,
      httpOnly: true,
    });

    res.locals.uid = user._id;

    return res.status(200).json({
      ok: true,
      msg: 'Usuario registrado exitosamente',
      uid: user._id,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'Error en el servidor',
      error,
    });
  }
};

module.exports.login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createJWT(user._id);
    res.cookie('jwt', token, {
      maxAge: 60 * 60 * 24 * 3 * 1000,
      httpOnly: true,
    });

    res.locals.uid = user._id;

    return res.status(200).json({
      ok: true,
      msg: 'Inicio de sesión exitoso',
      uid: user._id,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'No se pudo iniciar sesión',
      error: error.message,
    });
  }
};

module.exports.renew = async (req = request, res = response) => {
  const { uid } = res.locals;

  try {
    const token = createJWT(uid);
    res.cookie('jwt', token, {
      maxAge: 60 * 60 * 24 * 3 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      ok: true,
      msg: 'Token renovado exitosamente',
      uid,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'No se pudo renovar el token',
      error: error.message,
    });
  }
};

module.exports.logout = (req = request, res = response) => {
  res.cookie('jwt', '', { maxAge: 1 });
  return res.status(200).json({
    ok: true,
    msg: 'Sesión cerrada',
    uid: res.locals.uid,
  });
};
