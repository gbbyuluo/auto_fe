/**
 * Created by gebb on 2018/2/22.
 */
var fs=require('fs');
var zlib=require('zlib');
fs.createReadStream('input.txt')
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream('input.txt.gz'));
console.log('写入完成')