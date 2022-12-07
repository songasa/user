<template>
    <div class="container">
        <div id="map-container">地图</div>
    </div>
</template>

<script>
import cookie from 'js-cookie'
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.mapInit()
  },
  methods: {
    mapInit () {
      this.map = new AMap.Map('map-container', {resizeEnable: true  ,zoom: 13 , center: [cookie.get('lng'), cookie.get('lat')]})

    }
  }
}
</script>

<style>
#map-container {
    width: 70vw;
    height: 70vh;
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

