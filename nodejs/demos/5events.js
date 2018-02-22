/**
 * Created by gebb on 2018/2/22.
 */
/**引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
// 绑定事件及事件的处理程序
eventEmitter.on('eventName', eventHandler);
// 触发事件
eventEmitter.emit('eventName');*/

// demos
var events=require('events');
var eventEmitter=new events.EventEmitter();
eventEmitter.on('contetion',function(){
    console.log('连接成功');
});
eventEmitter.emit('contetion');

