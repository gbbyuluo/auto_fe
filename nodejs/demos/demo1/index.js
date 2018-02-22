/**
 * Created by gebb on 2018/2/22.
 */
var server=require('./server')
var route=require('./route')
server.start(route.route)