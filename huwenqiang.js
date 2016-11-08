/**
 * Created by Administrator on 2016/10/20.
 */
'use strict'
var request = require('request');
var xlsx = require('node-xlsx');
var worksheet = xlsx.parse('./1-2.xlsx');
var fs = require('fs');
var cheerio = require('cheerio')

/*
console.log(worksheet);
console.log(worksheet[0].data[1]);
*/

for(let i =1;i<worksheet[0].data.length;i++){
    let picname = worksheet[0].data[i][0];
    console.log(picname);
    let cardUrl = worksheet[0].data[i][1];
    let filename = picname + '.png';
    request(cardUrl,function (err,res,body) {
        let $ = cheerio.load(body);
        let picUrl = $('.AdaptiveMedia-photoContainer').attr('data-image-url') || $('._jjzlb img').attr('src');
        if(picUrl){
            downloadImg(picUrl,filename,function () {
                console.log(filename+'done');
            })
        }
    })
    
}
function downloadImg(uri,filename,cb) {
    request.head(uri,function (err,res,body) {
        if(err){
            console.log('err:'+err);
            return false;
        }
        request(uri).pipe(fs.createWriteStream('img/'+filename)).on('close',cb);
    })
}
