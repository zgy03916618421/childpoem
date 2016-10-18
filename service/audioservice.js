/**
 * Created by Administrator on 2016/10/14.
 */
var httpUtil = require('../utils/httpUtils');
exports.audioinfo = function *(pid,userid) {
    var data = {};
    var selfAudios = yield mongodb.collection('audio').aggregate([
        {$match:{'userId':userid,'poemId':pid}},
        {$sort:{'createTime':-1}}
    ]).toArray();
    var selfAudio = selfAudios[0];
    var Acount = yield mongodb.collection('audio').aggregate([
        {$match:{poemId:pid}},
        {$group:{_id:null,count:{$sum:1}}}
    ]).toArray();
    if(!Acount.length){
        return {'head':{code:1000,msg:'no audio'}};
    }else{
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
        return {'head':{code:200,msg:'success'},'data':data};
    }
}
exports.myworklist = function *(pid,userid,skip,limit) {
    var data = {};
    data.userinfo = yield getUserInfo(userid);
    var audios = yield mongodb.collection('audio').aggregate([
        {$match:{"poemId":pid,"userId":userid}},
        {$skip:skip},
        {$limit:limit}
    ]).toArray();
    if(!audios.length){
        return {'head':{code:1000,msg:'no audio'}}
    }else{
        for (var i =0;i<audios.length;i++){
            console.log(audios[i]._id);
            var listen = yield mongodb.collection('action').aggregate([
                {$match:{"targetId":audios[i]._id.toString(),"action":"listen"}},
                {$group:{_id:null,count:{$sum:1}}}
            ]).toArray()
            if(!listen.length){
                audios[i].listen = 0;
            }else{
                audios[i].listen = listen[0].count;
            }
            var comment = yield mongodb.collection('comment').aggregate([
                {$match:{"targetId":audios[i]._id.toString()}}
            ]).toArray();
            audios[i].comment = comment.length;
        }
        data.audio = audios;
        return {'head':{code:200,msg:'success'},'data':data}
    }
    
}
exports.otherworklist = function *(pid,userid,skip,limit) {
    var elseAudios = yield mongodb.collection('audio').aggregate([
        {$match:{"poemId":pid,"userId":{$ne:userid}}},
        {$skip:skip},
        {$limit:limit}
    ]).toArray();
    if(!elseAudios.length){
        return {'head':{code:1000,msg:'no audio'}}
    }else{
        for(var i=0;i<elseAudios.length;i++){
            var listen = yield mongodb.collection('action').aggregate([
                {$match:{"targetId":elseAudios[i]._id.toString(),"action":"listen"}},
                {$group:{"_id":null,"count":{$sum:1}}}
            ]).toArray();
            if(!listen.length){
                elseAudios[i].listen = 0;
            }else{
                elseAudios[i].listen = listen[0].count;
            }
            var comment = yield mongodb.collection('comment').aggregate([
                {$match:{"targetId":elseAudios[i]._id.toString()}},
                {$group:{"_id":null,count:{$sum:1}}}
            ]).toArray();
            if(!comment.length){
                elseAudios[i].comment = 0;
            }else{
                elseAudios[i].comment = comment[0].count;
            }
            elseAudios[i].userinfo= yield getUserInfo(elseAudios[i].userId);
        }
        var data = elseAudios;
        return {'head':{code:200,msg:'success'},'data':data};
  /*      var elseId = elseAudios.map(function (doc) {
            return doc.userId;
        })
        var userinfos = yield getManyUser(elseId);
        data.userinfo = userinfos
        return data
    }*/}
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
