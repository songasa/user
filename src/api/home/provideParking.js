import request from '@/utils/request'
export default {
  //返回停车位地址经纬度
  parking_ll(address,addressQuery){
        return request({
            url: `/service_parking/parking-details/parking_ll/${address}`,
            method: 'post',
            data: addressQuery
          })
    },
    //返回停车位地址和行政编码
    parking_adcode(lng,lat,addressQuery){
        return request({
            url: `/service_parking/parking-details/parking_adcode/${lng}/${lat}`,
            method: 'post',
            data: addressQuery
        })
    },

    //添加停车位
    addParking(parking){
        return request({
            url: `/service_parking/parking-details`,
            method: 'post',
            data: parking
        })
    },

    //查看停车位
    getParkingList(current,limit,ownerProductNo,parkingDetailsQuery){
        return request({
            url: `/service_parking/parking-details/parkingDetailsFindByProductNo/${current}/${limit}/${ownerProductNo}`,
            method: 'post',
            data: parkingDetailsQuery
            
        })
    },

    //查看停车位
    parkingLogsFindByParkingNo(current,limit,parkingNo,parkingDetailsQuery1){
        return request({
            url: `/service_parking/parking-logs/parkingLogsFindByParkingNo/${current}/${limit}/${parkingNo}`,
            method: 'post',
            data: parkingDetailsQuery1
            
        })
    },

    //修改停车位表
    updateParkingDetailsByParkingNo(parkingNo,updateParkingDetails){
        return request({
            url: `/service_parking/parking-details/updateParkingDetailsByParkingNo/${parkingNo}`,
            method: 'post',
            data: updateParkingDetails
        })
    },

    //修改日志表
    updateLogsByParkingNo(parkingNo,updateLogs){
        return request({
            url: `/service_parking/parking-logs/updateLogsByParkingNo/${parkingNo}`,
            method: 'post',
            data: updateLogs
        })
    },

    //删除停车位
    deleteParkingNo(parkingNo){
        return request({
            url: `/service_parking/parking-details/deleteParkingDetails/${parkingNo}`,
            method: 'delete'
        })
    },

}