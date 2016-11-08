/**
 * Created by Administrator on 2016/10/14.
 */
var audioService = require('../service/audioservice');
exports.audioinfo = function *() {
    var pid = this.params.pid;
    var userid = this.params.userid;
    var token = this.request.header.token;
    var data = yield audioService.audioinfo(pid,userid,token);
    this.body = data;
}
exports.myworklist = function *() {
    var pid = this.params.pid;
    var userid = this.params.userid;
    var skip = parseInt(this.query.skip);
    var limit = parseInt(this.query.limit);
    var token = this.request.header.token;
    var data = yield audioService.myworklist(pid,userid,skip,limit,token);
    this.body = data
}
exports.otherworklist = function *() {
    var pid = this.params.pid;
    var userid = this.params.userid;
    var skip = parseInt(this.query.skip);
    var limit = parseInt(this.query.limit);
    var token = this.request.header.token;
    var data = yield audioService.otherworklist(pid,userid,skip,limit,token);
    this.body = data;
}
exports.mycomments = function *() {
    var skip = this.query.skip;
    var limit = this.query.limit;
    var userid = this.query.userId;
    var token = this.request.header.token;
    console.log(token);
    var data = yield audioService.mycomments(userid,skip,limit,token);
    this.body = data;
}