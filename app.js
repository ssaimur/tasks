const express = require('express');
const app = express();
require('dotenv').config();
const con = require('./dbcon');
const cookieParser = require('cookie-parser');
const checkAuth = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const authRouter = require('./routers/authRouter');
const productRouter = require('./routers/productRouter');

app.use(require('morgan')('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

con.connect((err) => {
  if (err) {
    console.log({ err });
  }
  console.log('Conected to database...');
});

// auth router
app.use('/api/auth', authRouter);

// product router
app.use('/api/product', checkAuth('manager'), productRouter);

// error handler middleware
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is listening at ${port}...`);
});
