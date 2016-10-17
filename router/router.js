/**
 * Created by Administrator on 2016/10/14.
 */
var router = require('koa-router')();
var C= require('../controller/controller')
router.get('/dev/childpoem/audioinfo/:pid/:userid',C.audioinfo);
router.get('/dev/childpoem/worklist/:pid/:userid',C.myworklist);
module.exports = router;