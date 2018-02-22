/**
 * Created by gebb on 2018/2/22.
 */
var fs = require("fs");
// fs.readFile()为异步读取文件
fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("程序执行结束!");