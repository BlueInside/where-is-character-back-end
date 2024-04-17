const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
// Connect to database
require('./utils/database');

// Require env variable
require('dotenv').config();

// Set up session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      dbName: 'where_are_characters',
    }),
    cookie: { maxAge: 2 * 24 * 3600000 }, // Two days
  })
);

// Middleware
app.use(helmet());
app.use(express.static('public'));
app.use(
  cors({
    origin: 'http://localhost:5173', // Replace later with front end
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
