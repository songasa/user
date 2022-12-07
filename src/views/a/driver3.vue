<template>
  <div id="demo">
    <el-amap vid="amapDemo" :amap-manager="amapManager" :events="mapEvents" class="amap-driver">
    </el-amap>
  </div>
</template>

<script>
  import VueAMap from 'vue-amap'
  let amapManager = new VueAMap.AMapManager();
  export default {
    data() {
      return {
        amapManager,
        mapEvents: {
          init(o) {
            o.setMapStyle('amap://styles/macaron'); //自定义的高德地图的样式，我选的是马卡龙
            let marker = new AMap.Marker({ //点图标
              position: [116.379028, 39.865042]
            });
            o.setZoomAndCenter(16, [116.379028, 39.865042])
            marker.setMap(o);
            o.plugin(["AMap.Walking"], function() {
              var driving = new AMap.Walking({
                map: o
              })
              //位置经纬度+ 驾车路线规划
              //参考连接： https://lbs.amap.com/api/javascript-api/example/driving-route/plan-route-according-to-lnglat
              //官方文档说明： https://lbs.amap.com/api/javascript-api/reference/route-search#m_AMap.Driving
              driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719), function(status, result) {
                if (status === 'complete') {
                  console.log('绘制成功');
                } else {
                  console.log('绘制失败', result);
                }
              });
              o.addControl(driving);
            })
          }
        }
      }
    }
  }
</script>
<style>
  .amap-driver {
    width: 100%;
    height: 100vh;
  }
</style>