/**
 * Created by gebb on 2018/2/22.
 */
var http=require('http');
http.createServer(onRequest).listen(8888);
function  onRequest(request,response){
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write('hell');
    response.end();
}
console.log('服务器开启成功')