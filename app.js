var express = require('express');
var cors = require('cors');
// var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var todosRouter = require('./routes/todos');
var santaRouter = require('./routes/santa');

var AuthService = require('./services/auth.service');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/todos', [AuthService.verifyToken], todosRouter);
app.use('/', santaRouter);

module.exports = app;
