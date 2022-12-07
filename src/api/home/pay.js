import request from '@/utils/request'
export default {

    //添加充值到日志表
    addParkingLogs(parkingLogs){
        return request({
            url: `/service_parking/parking-logs`,
            method: 'post',
            data: parkingLogs
        })
    },

    //根据个人手机号修改余额 加费
    updateUserMoneyByProductNo(productNo,money){
        return request({
            url: `/service_parking/user/updateUserMoneyByProductNo/${productNo}/${money}`,
            method: 'post',
        })
      },
}