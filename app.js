/**
 * Created by Administrator on 2016/10/14.
 */
var koa = require('koa');
var router = require('./router/router');
var logger = require('koa-logger');
var app = koa();
require('./middleware/connectMongo');
app.use(logger());
app.use(router.routes()).use(router.allowedMethods());
app.listen(10004)