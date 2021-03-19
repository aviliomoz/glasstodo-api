const { Schema, model } = require('mongoose');

const taskModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  // },
});

module.exports = model('Task', taskModel);
