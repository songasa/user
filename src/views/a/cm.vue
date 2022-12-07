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

    // this.carGPSIP()
  },
  methods: {
    mapInit () {
      this.map = new AMap.Map('container', {resizeEnable: true})
      this.map.on('click', (e) => {
        // 点击坐标
        console.log(e.lnglat.lng)
        this.markersPosition = [e.lnglat.lng, e.lnglat.lat]
        this.removeMarker()
        // 设置新的标记
        this.setMapMarker()
      })

      this.carGPSIP()

    },

    //mark
    carGPSIP() {
      var map = new AMap.Map("container", {resizeEnable: true});//初始化地图
      //信息窗口实例
      var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)}); 

      //遍历生成多个标记点
      for (var i = 0, marker; i < this.lnglats.length; i++) {
        var marker = new AMap.Marker({
          position: this.lnglats[i],//不同标记点的经纬度
          map: map
        });
        marker.content = '我是第' + (i + 1) + '个Marker';
        marker.on('click', markerClick);
        marker.emit('click', {target: marker});//默认初始化不出现信息窗体,打开初始化就出现信息窗体
      }
      function markerClick(e) {
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
      }
      map.setFitView();
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