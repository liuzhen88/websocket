var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.use(function (socket, next) {
  console.log('io使用中间件');
  next();
});

io.on('connection',function (client) {
  console.log('socket io connect success');
  //客户端向服务器端推送数据
  client.on('msg',function (data) {
    console.log('客户端推送数据成功');
    console.log(data);
  });
  //客户端退出连接
  client.on('discount',function () {
    console.log('客户端退出连接');
  });

  //服务器端推送消息给客户端
  client.emit('sendMsgToClient',{msg:'来着Node.js推送的消息'});
});

server.listen(3000,function () {
  console.log('Node.js server start success at port 3000');
});

module.exports = app;
