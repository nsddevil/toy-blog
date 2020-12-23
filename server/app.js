require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./models');
const passport = require('passport');
const { verifyToken } = require('./middleware');
const passportConfig = require('./passport');
const routes = require('./routes');
const path = require('path');
const app = express();
const { PORT } = process.env;

connectDB();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passportConfig();

app.use(verifyToken);

app.use(express.static(path.join(__dirname, 'build')));
app.use('/image', express.static(path.join(__dirname, 'uploads')));
app.use('/api', routes);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: error.message,
  });
});

// app.use('*', (req, res) => {
//   const basePath = path.join(__dirname, 'build', 'index.html');
//   res.sendFile(basePath);
// });

app.listen(PORT, () => console.log(`server start PORT: ${PORT}`));
