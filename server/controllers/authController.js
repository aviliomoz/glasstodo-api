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

    return res.status(200).json({
      ok: true,
      msg: 'Usuario registrado exitosamente',
      uid: user._id,
      token,
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

    return res.status(200).json({
      ok: true,
      msg: 'Inicio de sesión exitoso',
      uid: user._id,
      token,
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
  const { uid } = req.body;

  try {
    const token = createJWT(uid);

    return res.status(200).json({
      ok: true,
      msg: 'Token renovado exitosamente',
      uid,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'No se pudo renovar el token',
      error: error.message,
    });
  }
};

module.exports.getUserNameById = async (req = request, res = response) => {
  const uid = req.params.id;

  try {
    const user = await User.findById(uid);
    return res.status(200).json({
      ok: true,
      msg: 'Nombre de usuario',
      user: user.name,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'No se encontró el usuario',
      error: error.message,
    });
  }
};
