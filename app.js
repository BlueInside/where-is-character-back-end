const express = require('express');
const app = express();
const cors = require('cors');

// Connect to database
require('./utils/database');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
