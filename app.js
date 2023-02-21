const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const { mainModule } = require('process');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGO_CONNECTION;

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;