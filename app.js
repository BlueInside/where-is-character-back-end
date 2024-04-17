const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const compression = require('compression');
const helmet = require('helmet');
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

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

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

// Middleware
app.use(limiter);
app.use(compression());
app.use(helmet());
app.use(express.static('public'));
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(port, host, () => {
  console.log('App listening');
});
