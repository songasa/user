import Vue from 'vue'


import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import VueAMap from 'vue-amap';  // 高德地图
Vue.use(VueAMap);
  // 初始化vue-amap
  VueAMap.initAMapApiLoader({
    // 高德key Web端 
    key: '80aa7300f934e23fb8c73f9bcdf074c3',

    // 高德key js-api接口调用
    // key: '42180226155d89ad5045291e8bdeb5ea',

    // 插件集合 （插件按需引入）
    plugin: [
      "AMap.Autocomplete", //输入提示插件
      "AMap.PlaceSearch", //POI搜索插件
      "AMap.Scale", //右下角缩略图插件 比例尺
      "AMap.OverView", //地图鹰眼插件
      "AMap.ToolBar", //地图工具条
      "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
      "AMap.PolyEditor", //编辑 折线多，边形
      "AMap.CircleEditor", //圆形编辑器插件
      "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
      'AMap.Geocoder', 
      'AMap.AMapManager', 
      'AMap.Marker',
      'AMap.Driving',
      'AMap.MouseTool', 
      'AMap.DistrictSearch', 
      'AMap.InfoWindow',
      'AMap.DragRoute',
  ],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4',
    uiVersion: '1.0',
  });

window._AMapSecurityConfig = {
    securityJsCode:'f0f278b2a1ef3ebeb95fdcc287f00655',
}


Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
