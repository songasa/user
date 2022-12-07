import request from '@/utils/request'
export default {
  //查询个人信息
  updateUserDetailsByID(id,productNo,loginInfo){
        return request({
            url: `/service_parking/user/updateUserDetailsByID/${id}/${productNo}`,
            method: 'post',
            data: loginInfo
          })
    },

}