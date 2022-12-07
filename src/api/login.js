import request from '@/utils/request'

//登录
export function login(productNo,pwd) {
  return request({
    url: `/service_parking/user/login/${productNo}/${pwd}`,
    method: 'post',
    data: {
      productNo,
      pwd
    }
  })

}

export function getInfo(productNo,token) {
  return request({
    url: `/service_parking/user/info/${productNo}`,
    method: 'get',
    params: { token }
  })
  
}

export function logout() {
  return request({
    url: '/service_parking/user/logout',
    method: 'post'
  })
}

//根据Token返回用户信息
export function getInfoByToken(){
  return request({
    url: '/service_parking/user/getInfoByToken',
    method: 'get'
  })
}