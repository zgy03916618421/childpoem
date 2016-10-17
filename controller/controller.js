/**
 * Created by Administrator on 2016/10/14.
 */
var audioService = require('../service/audioservice');
exports.audioinfo = function *() {
    var pid = this.params.pid;
    var userid = this.params.userid;
    var data = yield audioService.audioinfo(pid,userid);
    this.body = {'head':{code:200,msg:'success'},'data':data};
}
exports.myworklist = function *() {
    var pid = this.params.pid;
    var userid = this.params.userid;
    var skip = parseInt(this.query.skip);
    var limit = parseInt(this.query.limit);
    var data = yield audioService.myworklist(pid,userid,skip,limit);
}
exports.otherworklist = function *() {
    var pid = this.params.pid;
    var userid = this.params.userid;
    var skip = parseInt(this.query.skip);
    var limit = parseInt(this.query.limit);
    yield audioService.otherworklist(pid,userid,skip,limit);
}