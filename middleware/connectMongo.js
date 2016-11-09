/**
 * Created by Administrator on 2016/10/14.
 */
var MongoClient = require('mongodb').MongoClient;
var mongUrl = process.env.CHILDPOEM_MONGOURL
MongoClient.connect(mongUrl,function (err,db) {
    if (err) {
        console.error("connect to mongo error");
        process.exit(1);
    } else {
        global.mongodb = db;
        console.log("connect to mongo success!");
    }
})