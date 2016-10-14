/**
 * Created by Administrator on 2016/10/14.
 */
var audioService = require('../service/audioservice');
exports.audioinfo = function *() {
    var pid = this.params.pid;
    var userid = this.params.userid;
    var data = yield audioService.audioinfo();
    this.body = {'head':{code:200,msg:'success'},'data':data};
}