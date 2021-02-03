const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const serveStatic = require('serve-static');
const path = require('path');
const staticVue = require('./routes/static');
const apiRoutes = require('./routes/api/index');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

// Allow Cross-Origin requests
app.use(cors());

app.use(serveStatic(__dirname + "/dist"))

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Set security HTTP headers
app.use(helmet());

// Of Nginx proxy
app.set('trust proxy', 1);

// Limit request from the same API 
const limiter = rateLimit({
    max: 20,
    windowMs: 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/api', limiter);

// Body parser, reading json from body into req.body
app.use(express.json({
    limit: '15mb'
}));

// Body parser, reading data from body into req.body
app.use(
    express.urlencoded({
      limit: '15mb',
      extended: true
    })
  )


// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Routes
app.use('/api/v1/', apiRoutes);
app.use('', staticVue);


module.exports = app;