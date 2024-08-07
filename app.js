const createError = require('http-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const port = process.env.PORT || 3000;

// Connect to database
require('./utils/database');

// Require env variable
require('dotenv').config();

// Enable trust for proxy headers
app.set('trust proxy', 1);


// Set up rate limiter: maximum of twenty requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
});

app.use(limiter);
app.use(
  cors({
    origin: 'https://where-is-character.netlify.app',
    credentials: true,
  })
);
app.use(compression());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err);

  // Provide errors only in development
  const errorDetails =
    req.app.get('env') === 'development'
      ? {
        message: err.message,
        error: err,
      }
      : {};

  res.status(err.status || 500);
  // Return JSON
  res.json({
    message: err.message,
    ...errorDetails,
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log('App listening');
});
