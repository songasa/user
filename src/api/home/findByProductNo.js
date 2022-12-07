import request from '@/utils/request'
export default {
  //查询个人信息
  findByProductNo(productNo,userQuery){
        return request({
            url: `/service_parking/user/findByProductNo/${productNo}`,
            method: 'post',
            data: userQuery
          })
    },

}