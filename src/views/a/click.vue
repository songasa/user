<template>
    <div class="container">
        <div id="container" style="width: 100%;height: 550px">地图</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      markers: [],
      lnglats: [
        [108.909074, 34.254225],
        [108.910766, 34.254348],
        [108.910495, 34.253531],
        [108.909502, 34.253571],
      ],
    }
  },
  mounted () {
    this.mapInit()
  },
  methods: {
    mapInit () {
      this.map = new AMap.Map('container', {resizeEnable: true})
      this.map.on('click', (e) => {
        // 点击坐标
        // console.log(e.lnglat.lng)
        this.markersPosition = [e.lnglat.lng, e.lnglat.lat]
        this.removeMarker()
        // 设置新的标记
        this.setMapMarker()
      })

        //驾车线路规划
            var drivingOption = {
                policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
                ferry: 1, // 是否可以使用轮渡
                // province: '京', // 车牌省份的汉字缩写 
                map: map,
                panel: 'panel'
            }
            // 构造路线导航类
            var driving = new AMap.Driving(drivingOption)

            // 根据起终点经纬度规划驾车导航路线
            driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719), function(status, result) {
                // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                if (status === 'complete') {
                    log.success('绘制驾车路线完成')
                } else {
                    log.error('获取驾车数据失败：' + result)
                }
            });
        

    },
    // 设置点击位置的标记
    setMapMarker () {
      let marker = new AMap.Marker({
        map: this.map,
        position: this.markersPosition
      })
      // 将 markers 添加到地图
      this.markers.push(marker)
    },
    // 删除之前后的标记点
    removeMarker () {
      if (this.markers) {
        this.map.remove(this.markers)
      }
    },
    
  }
}
</script>