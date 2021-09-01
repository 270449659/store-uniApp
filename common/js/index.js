/**
 * 格式化日期
 *
 * @param date date 格林威治时间
 * @author: crlang
 */
export var formatTime = function (date, sep) {
    if (sep === void 0) { sep = '/'; }
    if (!date || date === null) {
        date = new Date();
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return ([year, month, day].map(formatNumber).join(sep) +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':'));
};
/**
 * 格式化数值 - 个位数前导补零
 *
 * @param number n 数值
 * @author: crlang
 */
var formatNumber = function (n) {
    var s = n.toString();
    return s[1] ? s : '0' + s;
};


export function object2String(obj) {
  var objStr = '';
  if (typeof obj === 'object' && Object.getOwnPropertyNames(obj).length > 0) {
      var objKeys = Object.getOwnPropertyNames(obj).sort();
      for (var k in objKeys) {
          var item = obj[objKeys[k]];
		  
          if (typeof item === 'object' && Object.getOwnPropertyNames(item).length > 0) {
              item = object2String(item);
          }
          objStr += objKeys[k] + item;
      }
  }
  return objStr;
}



// var date=new Date();
// var year=date.getFullYear(); //获取当前年份   
// var mon=date.getMonth()+1; //获取当前月份  
// 	mon= mon.toString()

// 	console.log('mon',mon.length)
// var da=date.getDate(); //获取当前日   
// var h=date.getHours(); //获取小时   
// var m=date.getMinutes(); //获取分钟   
// var s=date.getSeconds(); //获取秒   
// console.log('s2',year+'-'+mon+'-'+da+''+' '+h+':'+m+':'+s);
// this.times=year+'-'+mon+'-'+da+" "+h+':'+m+':'+s;
//  console.log('this.times',this.times);