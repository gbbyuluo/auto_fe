//now,格式例如newDate（）；newDate(1512720796810)
function   formatDate(now)   {
    var   year=now.getFullYear();
    var   month=now.getMonth()+1;
    var   date=now.getDate();
    var   hour=now.getHours();
    var   minute=now.getMinutes();
    return   year+"-"+month+"-"+date+"   "+hour+":"+minute;
}
//实例
var   d=new   Date(595000);
console.log((formatDate(d)));
