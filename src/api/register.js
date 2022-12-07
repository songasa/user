import request from '@/utils/request'
export default {
  //实现注册功能 注册
    register(name,productNo,pwd,code){
        return request({
            url: `/service_parking/user/register/sms/register/${name}/${productNo}/${pwd}/${code}`,
            method: 'post'
          })
    },
  //实现注册功能 找回密码
    findPWD(productNo,pwd,code){
      return request({
          url: `/service_parking/user/register/sms/findPWD/${productNo}/${pwd}/${code}`,
          method: 'post'
        })
  },

    //实现发验证码功能 注册
    registerCode(productNo) {
        return request({
          //自己模仿的阿里云短信接口返回值到redis里
          // url: `/service_parking/user/register/sms/sendtest/${productNo}`,

          //阿里云短信接口，一条3分多
          url: `/service_parking/user/register/sms/send/${productNo}`,
          method: 'post'
        })
      },

    //实现发验证码功能 找回密码
    findPWDCode(productNo) {
      return request({
        //自己模仿的阿里云短信接口返回值到redis里
        // url: `/service_parking/user/findPWDInfo/sms/sendtest/${productNo}`,

        //阿里云短信接口，一条3分多
        url: `/service_parking/user/findPWD/sms/send/${productNo}`,
        method: 'post'
      })
    },

}