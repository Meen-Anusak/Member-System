const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const config = require('./configs/env');
const error = require('./middleware/errorHandler');

const cors = require('cors');

const app = express();

mongoose.connect(config.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.use(cors());

app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

app.use(error);

module.exports = app;
