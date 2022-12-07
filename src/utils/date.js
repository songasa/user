export default{
    dateFormat(time) {
        var date=new Date(time);
        var year=date.getFullYear();
        /* 在日期格式中，月份是从0开始的，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        // 拼接
        return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    },

    //将yyyy-MM-dd hh:mm:ss转换为时间戳
    zhuanhuan(stringTime){
        // var stringTime = "2014-07-10 10:21:12";
        var timestamp2 = stringTime.replace(/-/g, '/')   //为了兼容IOS，需先将字符串转换为'2018/9/11 9:11:23'
        timestamp2 = Date.parse(timestamp2)    //返回'2018-9-12 9:11:23'的时间戳
        // console.log(stringTime + "的时间戳为：" + timestamp2);
        return timestamp2;
    },

    //时间戳转换为小时
    mmToHour(mm){
        return mm / 1000 / 60/ 60
    },
}