var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();


app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production',
    root:'/views',
    extname:'.html'

});

// ============================================
// ===========总路由导向========================
// ============================================

const index = require('./routes/index');
const wechat = require('./routes/wechat');
app.use('/', index);
app.use('/wechat', function(req,res){
  console.log('sss');
});


// var wechatApi = require('wechat-api');

// var menu = {
//     "button": [
//         {
//             "type": "click",
//             "name": "今日歌曲",
//             "key": "V1001_TODAY_MUSIC"
//         },
//         {
//             "name": "菜单",
//             "sub_button": [
//                 {
//                     "type": "view",
//                     "name": "搜索",
//                     "url": "http://www.soso.com/"
//                 },
//                 {
//                     "type": "miniprogram",
//                     "name": "wxa",
//                     "url": "http://mp.weixin.qq.com",
//                     "appid": "wx286b93c14bbf93aa",
//                     "pagepath": "pages/lunar/index"
//                 },
//                 {
//                     "type": "click",
//                     "name": "赞一下我们",
//                     "key": "V1001_GOOD"
//                 }]
//         }]
// }

// var config = {
//     token: 'aoxing',
//     appid: 'wx4fe135a46ae46e63',
//     appsecret: '2e687056f88e92ecc50f2d337d89c4f2',
//     encodingAESKey: 'NiaxaonIJ7nCRNozPXLsJSIWdzE09sRNvSvdxsyDTAR'
// };

// var api = new wechatApi(config.appid,config.appsecret);

// var menu = {
//   "button": [
//     {
//       "type": "click",
//       "name": "WeChat Bot",
//       "key": "V1001_TODAY_MUSIC"
//     },
//     {
//       "name": "BotFramework",
//       "sub_button": [
//         {
//           "type": "view",
//           "name": "botframework",
//           "url": "https://dev.botframework.com/"
//         },
//         {
//           "type": "click",
//           "name": "赞一下我们",
//           "key": "V1001_GOOD"
//         }, {
//           "name": "发送位置",
//           "type": "location_select",
//           "key": "rselfmenu_2_0"
//         },]
//     }]
// };

//创建菜单
// api.createMenu(menu, function (err, result) {
  // if (err) {
    // logger.log('error', err);
  // }
  // logger.log('info', 'create menu success');
// });





// view engine setup
// template.config('extname', '.html');
// app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
