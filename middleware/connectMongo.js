/**
 * Created by Administrator on 2016/10/14.
 */
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://192.168.100.2/hummingbird',function (err,db) {
    if (err) {
        console.error("connect to mongo error");
        process.exit(1);
    } else {
        global.mongodb = db;
        console.log("connect to mongo success!");
    }
})