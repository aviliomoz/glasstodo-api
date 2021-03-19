const api = require('./api');

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', api);

app.listen(process.env.PORT, () => {
  console.log(`Server runnig on port ${process.env.PORT}`);
});

mongoose.connect(
  process.env.DB_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw new mongoose.Error(err);
    console.log('Database ready');
  },
);
