const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const host = process.env.HOST || '127.0.0.1';
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

app.listen(port, host, () => {
  console.log('App listening');
});
