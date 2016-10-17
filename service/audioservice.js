/**
 * Created by Administrator on 2016/10/14.
 */
var httpUtil = require('../utils/httpUtils');
exports.audioinfo = function *(pid,userid) {
    var data = {};
    var selfAudio = yield mongodb.collection('audio').findOne({'userId':userid,'poemId':pid});
    var Acount = yield mongodb.collection('audio').aggregate([
        {$match:{poemId:pid}},
        {$group:{_id:null,count:{$sum:1}}}
    ]).toArray();
    var count = Acount[0].count;
    data.count = count;
    if(!selfAudio){
        var audio = yield mongodb.collection('audio').findOne({'poemId':pid});
        data.audio= audio;
        data.userinfo = yield getUserInfo(audio.userId);
    }else{
        data.audio = selfAudio;
        data.userinfo= yield getUserInfo(userid);
    }
    return data;
}
exports.myworklist = function *(pid,userid,skip,limit) {
    var data = {};
    data.userinfo = getUserInfo(userid);
    var audios = yield mongodb.collection('audio').aggregate([
        {$match:{"poemId":pid,"createUserId":userid}},
        {$skip:skip},
        {$limit:limit}
    ]).toArray();
    for (var i =0;i<audios.length;i++){
        var listen = yield mongodb.collection('action').aggregate([
            {$match:{"targetId":audios[i]._id,"action":"listen"}},
            {$group:{"_id":null,"count":{$sum:1}}}
        ])
        audios[i].listen = listen.count;
        var comment = yield mongodb.collection('comment').aggregate([
            {$match:{"targetId":audios[i]._id}},
            {$group:{"_id":null,count:{$sum:1}}}
        ])
        audios[i].comment = comment.count;
    }
    data.audio = audios;
}
exports.otherworklist = function *(pid,userid,skip,limit) {
    var data = {};
    var elseAudios = yield mongodb.collection('audio').aggregate([
        {$match:{"poemId":pid,"createUserId":{$ne:userid}}},
        {$skip:skip},
        {$limit:limit}
    ]).toArray();
    var elseUserId = yield mongodb.collection('audio').aggregate([

    ])
}
exports.getAudioByID = function *() {

}
function *getUserInfo(userid) {
    var opts = {
        method : 'GET',
        url : 'https://dev-users.beautifulreading.com/beautifulreading/userinfo/v3/user/user_id/' + userid
    };
    var userinfo = yield httpUtil.request(opts);
    userinfo = JSON.parse(userinfo);
    return userinfo
}