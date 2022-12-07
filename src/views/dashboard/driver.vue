<template>
  <div id="demo">
    <el-amap vid="amapDemo" :amap-manager="amapManager" :events="mapEvents" class="amap-driver">
    </el-amap>
    <div id="panel"></div>
  </div>
</template>

<script>
import cookie from 'js-cookie'
  export default {
    data() {
      return {
        mapEvents: {
          init(o) {
            o.setMapStyle('amap://styles/macaron'); //自定义的高德地图的样式，我选的是马卡龙
            let marker = new AMap.Marker({ //点图标
              position: [cookie.get('lng'),cookie.get('lat')]
            });
            o.setZoomAndCenter(16, [cookie.get('lng'),cookie.get('lat')])
            marker.setMap(o);
            o.plugin(["AMap.Driving"], function() {
              //构造路线导航类
              var driving = new AMap.Driving({
                  map: o,
                  panel: "panel"
              }); 
            //   //位置经纬度+ 驾车路线规划
            //   //参考连接： https://lbs.amap.com/api/javascript-api/example/driving-route/plan-route-according-to-lnglat
            //   //官方文档说明： https://lbs.amap.com/api/javascript-api/reference/route-search#m_AMap.Driving
              driving.search(new AMap.LngLat(cookie.get('lng'),cookie.get('lat')), new AMap.LngLat(cookie.get('endlng'),cookie.get('endlat')), function(status, result) {
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
        #panel {
            position: fixed;
            background-color: white;
            max-height: 90%;
            overflow-y: auto;
            top: 10px;
            right: 10px;
            width: 280px;
        }
        #panel .amap-call {
            background-color: #009cf9;
            border-top-left-radius: 4px;
   	        border-top-right-radius: 4px;
        }
        #panel .amap-lib-driving {
	        border-bottom-left-radius: 4px;
   	        border-bottom-right-radius: 4px;
            overflow: hidden;
        }
</style>
