/**
 * Created by Administrator on 2016/10/14.
 */
var router = require('koa-router')();
var C= require('../controller/controller')
router.get('/dev/childpoem/audioinfo/:pid/:userid',C.audioinfo);
router.get('/dev/childpoem/myworklist/:pid/:userid',C.myworklist);
router.get('/dev/childpoem/otherworklist/:pid/:userid',C.otherworklist);
router.get('/dev/childpoem/mycomments',C.mycomments);
module.exports = router;