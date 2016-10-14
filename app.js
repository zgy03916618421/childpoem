/**
 * Created by Administrator on 2016/10/14.
 */
var koa = require('koa');
var router = require('./router/router');
var app = koa();
app.use(router.routes()).use(router.allowedMethods());
app.listen()