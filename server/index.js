const api = require('./api');

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(CookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', api);

mongoose.connect(
  process.env.DB_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw mongoose.Error(err);
    app.listen(process.env.PORT, () => {
      console.log(`Server runnig on port ${process.env.PORT}`);
      console.log('Database ready');
    });
  },
);
