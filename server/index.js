require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./config/app');

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
