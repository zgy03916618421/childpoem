/**
 * Created by Administrator on 2016/10/14.
 */
var httpUtil = require('../utils/httpUtils');
exports.audioinfo = function *(pid,userid) {
    var data = {};
    var selfAudio = yield mongodb.collection('audio').findOne({'createUserId':userid,'poemId':pid});
    var Acount = yield mongodb.collection('audio').aggregate([
        {$match:{poemId:pid}},
        {$group:{_id:null,count:{$sum:1}}}
    ]);
    var count = Acount.count;
    data.count = count;
    if(!selfAudio){
        var audio = yield mongodb.collection('audio').findOne({'poemId':pid});
        data.audio= audio;
    }else{
        data.audio = selfAudio;
    }
    var opts = {
        method : 'GET',
        url : '/beautifulreading/userinfo/v3/user/user_id/' + userid
    };
    var userinfo = yield httpUtil.request(opts);
    data.userinfo = userinfo;
    return data;
}