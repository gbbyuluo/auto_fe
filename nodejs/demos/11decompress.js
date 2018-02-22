/**
 * Created by gebb on 2018/2/22.
 */
var fs=require('fs');
var zlib=require('zlib');
fs.createReadStream('input.txt.gz')
.pipe(zlib.createGunzip())
.pipe(fs.createWriteStream('in.txt'));
console.log('解压完成')