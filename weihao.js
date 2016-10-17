/**
 * Created by Administrator on 2016/10/14.
 */
var httpUtil = require('./utils/httpUtils');
var request = require('request');
var options = { method: 'GET',
    url: 'https://leancloud.cn/1.1/rtm/messages/logs',
    qs: { convid: '57de310279bc440065e1d4ab' },
    headers:
    { 'postman-token': 'c45c188d-0391-ca58-9a87-b4299bb05f66',
        'cache-control': 'no-cache',
        'x-lc-id': '7JMVeXNYgCdHmTIPrwA78DBB-gzGzoHsz',
        'x-lc-key': '0fhBSTYVwBI6vLHpgImhd3Sm,master',
        'content-type': 'application/json' },
    body: { userid: 'zhouguangyao', content: 'xvcxvcx', speed: false },
    json: true };

request(options, function (error, response, body) {
    for (var i=0;i<body.length;i++){
        var timestamp = body[i].timestamp;
        var msgid = body[i]['msg-id'];
        var convid = '57de310279bc440065e1d4ab';
        console.log(timestamp);
        console.log(msgid);
        console.log(convid);
        var opt = { method: 'DELETE',
            url: 'https://leancloud.cn/1.1/rtm/messages/logs',
            headers:
            {
                'x-lc-key': '0fhBSTYVwBI6vLHpgImhd3Sm,master',
                'x-lc-id': '7JMVeXNYgCdHmTIPrwA78DBB-gzGzoHsz',
                'content-type': 'application/x-www-form-urlencoded' },
            form:
            { 'convid': convid,
                'msgid': msgid,
                'timestamp': timestamp } };
        request(opt,function (err,res,body) {
            console.log('over');
        })
    }
});