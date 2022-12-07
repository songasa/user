import request from '@/utils/request'
export default {

    //查询日志信息
    parkingLogsFindByProductNo(current,limit,productNo,status){
    return request({
        url: `/service_parking/parking-logs/parkingLogsFindByProductNo/${current}/${limit}/${productNo}/${status}`,
        method: 'post',
        // data: parkingLogsQuery
      })
    },

    //设置ParkingDetails apoint = 0 更新收益 earnings
    setEarningsByParkingNo(parkingNo,earn,times){
      return request({
          url: `/service_parking/parking-details/setEarningsByParkingNo/${parkingNo}/${earn}/${times}`,
          method: 'post',
      })
    },

    //根据日志表ID set status = 1 结束 收益 earning
    setEarningByID(id,earn,actualtime){
      return request({
          url: `/service_parking/parking-logs/setEarningByID/${id}/${earn}/${actualtime}`,
          method: 'post',
      })
    },

        //根据日志表ID 修改预计结束时间，续时
        setReTimeByID(id,parkingUsetimeEnd){
          return request({
              url: `/service_parking/parking-logs/setReTimeByID/${id}/${parkingUsetimeEnd}`,
              method: 'post',
          })
        },

        //根据日志表ID 状态为1完成 退订
        setStatusByID(id){
          return request({
              url: `/service_parking/parking-logs/setStatusByID/${id}`,
              method: 'post',
          })
        },

    //根据个人ID修改余额 扣费
    updateUserMoneyByID(id,productNo,money){
      return request({
          url: `/service_parking/user/updateUserMoneyByID/${id}/${productNo}/${money}`,
          method: 'post',
      })
    },

    //根据个人手机号修改余额 加费
    updateUserMoneyByProductNo(productNo,money){
      return request({
          url: `/service_parking/user/updateUserMoneyByProductNo/${productNo}/${money}`,
          method: 'post',
      })
    },

    //根据停车位编号查询信息
    getByParkingNo(parkingNo){
      return request({
        url: `/service_parking/parking-details/getByParkingNo/${parkingNo}`,
        method: 'get',
    })
    },

}