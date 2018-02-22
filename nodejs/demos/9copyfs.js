/**
 * Created by gebb on 2018/2/22.
 */
var fs=require('fs');
var readStream=fs.createReadStream('input.txt');
var writeStream=fs.createWriteStream('output.txt');
readStream.pipe(writeStream);
console.log('写入完成');
