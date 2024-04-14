const express = require('express');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRouter = require('./index');
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
