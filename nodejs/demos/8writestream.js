/**
 * Created by gebb on 2018/2/22.
 */
var fs=require('fs');
var data='菜鸟教程，世界大学城kid';
var writeStream=fs.createWriteStream('output.txt');
writeStream.write(data,'UTF8');
writeStream.end();
writeStream.on('finish',function(){
console.log('写入完成');
})
writeStream.on('error',function(error){
    console.log(error.stack)
});
console.log('程序执行完毕')
