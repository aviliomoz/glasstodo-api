const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
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

const Task = model('task', taskSchema);

module.exports = Task;
