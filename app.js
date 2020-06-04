const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//1) Global Middlewares
// set secure http headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'To many requests from this IP. Please try again in an hour!'
});

//to limit the number of request to the application from a single IP, preventing brute force attacks
app.use('/api', limiter);

//Body parser. Reading data from body into req.body
app.use(express.json());

//Data sanitization against xss
app.use(xss());

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratongsQuantity',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

//Data sanitization agaonst NoSQL query injection
app.use(mongoSanitize());

//Serving static files
app.use(express.static(`${__dirname}/public`));
//2) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//handling all other routes not specified in our application
app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 400);
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
