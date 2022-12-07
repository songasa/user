import request from '@/utils/request'
export default{
        //返回IP 的地址信息
        IPToGPS(IP,addressQuery){
            return request({
                url: `/service_parking/parking-details/IPToGPS/${IP}`,
                method: 'post',
                data: addressQuery
            })
        },

        //返回市或区经纬度 的地址详细信息
        parkingDetailsFindadcode(current,limit,adcode,lng,lat,sq,ds,currenttime,addressDetailsQuery){
            return request({
                url: `/service_parking/parking-details/parkingDetailsFindadcode/${current}/${limit}/${adcode}/${lng}/${lat}/${sq}/${ds}/${currenttime}`,
                method: 'post',
                data: addressDetailsQuery
            })
        },

        //查询指定地址的停车位编码
        parkingDetailsFindByAddress(parkingDetailsNote,price,addressDetailsQuery){
            return request({
                url: `/service_parking/parking-details/parkingDetailsFindByAddress/${parkingDetailsNote}/${price}`,
                method: 'post',
                data: addressDetailsQuery
            })
        },

        //根据停车位编号修改停车位信息
        setAppointByParkingNo(parkingNo,appoint){
            return request({
                url: `/service_parking/parking-details/setAppointByParkingNo/${parkingNo}/${appoint}`,
                method: 'post',
            })
        },

        //插入到日志表
        addParkingLogs(form){
            return request({
                url: `/service_parking/parking-logs`,
                method: 'post',
                data: form
            })
        },

}