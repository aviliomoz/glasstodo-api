const { Schema, model } = require('mongoose');
const { isEmail } = require('validator').default;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  lastname: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Por favor ingresa un email válido'],
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'Debe contener al menos 6 caracteres'],
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error('Credenciales inválidas - password');
    }
  } else {
    throw Error('Credenciales inválidas - email');
  }
};

const User = model('user', userSchema);

module.exports = User;
