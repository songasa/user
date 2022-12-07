<template>
  <div>
    <div id="container" style="width: 100%;height: 550px"></div>
  </div>
</template>
<script>
import cookie from 'js-cookie'
export default {
  data() {
    return {
      markers: [],
    //要标记的所有点的经纬度
      lnglats: [
        [108.909074, 34.254225],
        [108.910766, 34.254348],
        [108.910495, 34.253531],
        [108.909502, 34.253571]
      ],
    }
  },
  mounted() {
    // this.carGPSIP()
    this.clickToMark()
  },
  methods: {

    clickToMark(){
      this.map = new AMap.Map('container', {resizeEnable: true  ,zoom: 15 , center: [this.lnglats[0][0],this.lnglats[0][1]]})
      for(var i=0;i<this.lnglats.length;i++){
        this.setMapMarker(this.lnglats[i][0],this.lnglats[i][1])
      }

      this.map.on('click', (e) => {
        // 点击坐标
        console.log(e.lnglat.lng)
        this.markersPosition = [e.lnglat.lng, e.lnglat.lat]
        this.removeMarker()
        // 设置新的标记
        this.setMapMarker(e.lnglat.lng, e.lnglat.lat)
      })
      
    },
    // 设置点击位置的标记
    setMapMarker (lng,lat) {
      //信息窗口实例
      let marker = new AMap.Marker({
        map: this.map,
        position: [lng,lat],
        offset: new AMap.Pixel(0, 20)
      })
      marker.setLabel({
          offset: new AMap.Pixel(0, 20),  //设置文本标注偏移量
          content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
          direction: 'right' //设置文本标注方位
      });
      // 将 markers 添加到地图
      this.markers.push(marker)
    },
    // 删除之前后的标记点
    removeMarker () {
      if (this.markers) {
        this.map.remove(this.markers)
        this.clickToMark()
      }
    },


    carGPSIP() {
      var map = new AMap.Map("container", {resizeEnable: true});//初始化地图
      //信息窗口实例
      // var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)}); 

      //遍历生成多个标记点
      for (var i = 0; i < this.lnglats.length; i++) {
        console.log(i)
        console.log([this.lnglats[0],this.lnglats[1]])
        let marker = new AMap.Marker({
          map: this.map,
          position: [this.lnglats[0],this.lnglats[1]]
        })
        // 将 markers 添加到地图
        this.markers.push(marker)

        // marker.content = '我是第' + (i + 1) + '个Marker';
        // marker.on('click', markerClick);
        // marker.emit('click', {target: marker});//默认初始化不出现信息窗体,打开初始化就出现信息窗体
      }
      // function markerClick(e) {
      //   infoWindow.setContent(e.target.content);
      //   infoWindow.open(map, e.target.getPosition());
      // }
      map.setFitView();
      },

    },

}
</script>