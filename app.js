const express = require('express');
const app = express();

// Connect to database
require('./utils/database');

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
