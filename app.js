const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
// Connect to database
require('./utils/database');

// Middleware
app.use(cookieParser());
app.use(express.static('public'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
