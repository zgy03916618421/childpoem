## 接口文档

###获取录音
```bash
GET /dev/childpoem/audioinfo/:pid/:userid
```
Parms

|name|required|type|located in|description|
|:----:|:--------:|:----:|:----------:|:-----------:|
|pid|true|string|params|诗歌id|
|userid|true|string|params|用户id|

###获取他人列表信息
```bash
GET /dev/childpoem/otherworklist/:pid/:userid
```
Parms

|name|required|type|located in|description|
|:----:|:--------:|:----:|:----------:|:-----------:|
|pid|true|string|params|诗歌id|
|userid|true|string|params|当前用户id|
|skip|true|string|query|跳过条目|
|limit|true|string|query|获取条目数|

###获取自己列表信息
```bash
GET /dev/childpoem/myworklist/:pid/:userid
```
Parms

|name|required|type|located in|description|
|:----:|:--------:|:----:|:----------:|:-----------:|
|pid|true|string|params|诗歌id|
|userid|true|string|params|当前用户id|
|skip|true|string|query|跳过条目|
|limit|true|string|query|获取条目数|

###获取我的评论信息
```bash
GET /dev/childpoem/mycomments
```
Parms

|name|required|type|located in|description|
|:----:|:--------:|:----:|:----------:|:-----------:|
|limit|true|string|query|获取条目数|
|skip|true|string|query|跳过条目数|
|userid|true|string|query|用户id|