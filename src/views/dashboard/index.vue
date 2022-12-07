<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您!</div>
    <el-button type="primary" icon="el-icon-edit" circle @click="showInfo"></el-button>
    <el-button type="primary" round @click="showInfo">查看并修改个人信息</el-button>

      <!--展示个人信息 -->
      <div v-if="!show">
          <template>
            <div>
            <el-row :gutter="20" style="margin-top:10px;">
            <el-col :span="24" >
                <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>基本资料</span>
                </div>
                <div>
                  <el-form label-width="140px" v-model="loginInfo" size="small" label-position="right">
                      <el-form-item label="手机号">
                        <el-input :disabled="true" maxlength="11" v-model="loginInfo.productNo"></el-input>
                      </el-form-item>
                  </el-form>
                  <el-form label-width="140px" v-model="loginInfo" size="small" label-position="right">
                      <el-form-item label="姓名">
                        <el-input :disabled="false" v-model="loginInfo.name" maxlength="20"></el-input>
                      </el-form-item>
                  </el-form>
                  <el-form label-width="140px" v-model="loginInfo" size="small" label-position="right">
                      <el-form-item label="性别">
                        <el-input :disabled="false" v-model="loginInfo.sex" placeholder="男/女" maxlength="1"></el-input>
                      </el-form-item>
                  </el-form>
                  <el-form label-width="140px" v-model="loginInfo" size="small" label-position="right">
                      <el-form-item label="账户创建时间">
                        <el-input :disabled="true" v-model="loginInfo.userCreatetime"></el-input>
                      </el-form-item>
                  </el-form>
                  <el-form label-width="140px" v-model="loginInfo" size="small" label-position="right">
                      <el-form-item label="身份证号">
                        <el-input :disabled="false" v-model="loginInfo.cardId" maxlength="18"></el-input>
                      </el-form-item>
                  </el-form>
                  <el-form label-width="140px" v-model="loginInfo" size="small" label-position="right">
                      <el-form-item label="车牌号1">
                        <el-input :disabled="false" v-model="loginInfo.carId1" maxlength="7"></el-input>
                      </el-form-item>
                  </el-form>
                  <el-form label-width="140px" v-model="loginInfo" size="small" label-position="right">
                      <el-form-item label="车牌号2">
                        <el-input :disabled="false" v-model="loginInfo.carId2" maxlength="7"></el-input>
                      </el-form-item>
                  </el-form>
                  <el-form label-width="140px" v-model="loginInfo" size="small" label-position="right">
                      <el-form-item label="车牌号3">
                        <el-input :disabled="false" v-model="loginInfo.carId3" maxlength="7"></el-input>
                      </el-form-item>
                  </el-form>
                  <el-form label-width="140px" v-model="loginInfo" size="small" label-position="right">
                      <el-form-item label="账户余额(元)">
                        <el-button size="mini" type="text" @click="pay" >充值</el-button>
                        <el-input :disabled="true" v-model="loginInfo.money"></el-input>
                      </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                  <el-button size="mini" type="primary" @click="updateUserDetailsByID">修改</el-button>
                  <el-button size="mini" type="warning" @click="showInfo" >关闭</el-button>
                </div>
                </div>
              </el-card>
                </div>
                </el-col>
              </el-row>
            </div>
        </template>
      </div>
     
      <!-- 默认主界面 -->
      <div v-else class="amap-wrap">
        <h3>您的位置,如有问题,请手动输入修改!</h3>
        <el-button style="width:20%;" type="primary" @click="IPToGPS">使用IP定位</el-button>
          <el-form label-width="120px">           
            <el-form-item>
              <el-col :span='18'>
                <el-input v-model="address"/>
              </el-col>
            </el-form-item>
          </el-form>
          <el-button style="width:20%;" type="primary" @click="changeAddress">输入修改我的定位</el-button>
          <div>
            <h4>直接点击地图修改定位</h4>
            <div id="container" style="width: 100%;height: 550px"></div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cookie from 'js-cookie'
import home from '@/api/home/findByProductNo'
import home1 from '@/api/home/updateUserDetailsByID'
import re from '@/api/home/recommendation'
import provide from '@/api/home/provideParking'
import { login, logout, getInfo ,getInfoByToken } from '@/api/login'

export default {
  name: 'Dashboard',
  data() {
    return {
      //map
      markers: [],
      //token
      token: {
        productNo:'',
        id:'',
      },
      //默认界面
      IP:'', //IP
      address:'', //地址
      lng:'',     //经度
      lat:'',     //纬度
      adcode:'',  //行政编码
      addressQuery:{},
      //个人页面
      loginInfo: {
        id: '',
        name:'',
        productNo:'',
        sex:'',
        money:'',
        cardId:'',
        carId1:'',
        carId2:'',
        carId3:'',
        userCreatetime:'',
      },
      //展示
      show: true,
      //后端的条件封装对象
      userQuery: {},
      //后端返回结果
      list:null,
    }
  },

  created() {    
      getInfoByToken()
        .then(response1 => {
          this.token.productNo = response1.data.user.productNo
          this.token.id = response1.data.user.id
          // this.init()
          {
            var cip = returnCitySN["cip"]
            this.ip = cip
            // console.log(this.ip);//ip就是本机ip地址
            this.address = cookie.get('address')
            // console.log(this.address)
            this.mapInit()
          }
        })
  },

  methods: {
    mapInit () {
      this.map = new AMap.Map('container', {resizeEnable: true  ,zoom: 14 , center: [cookie.get('lng'), cookie.get('lat')]})
      this.markersPosition = [cookie.get('lng'), cookie.get('lat')]
      this.removeMarker()
      // 设置新的标记
      this.setMapMarker()
      this.handlerMapClick()
    },
    handlerMapClick () {
      this.map.on('click', (e) => {
        // 点击坐标
        this.markersPosition = [e.lnglat.lng, e.lnglat.lat]
        this.click(e.lnglat.lng, e.lnglat.lat)
        this.removeMarker()
        // 设置新的标记
        this.setMapMarker()
      })
    },
    // 设置点击位置的标记
    setMapMarker () {
      let marker = new AMap.Marker({
        map: this.map,
        position: this.markersPosition,
        offset: new AMap.Pixel(0, 0),
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
      })
      //设置标签
      let address = cookie.get('address')
      marker.setLabel({
          offset: new AMap.Pixel(0, 0),  //设置文本标注偏移量
          content: `${address}`, //设置文本标注内容
          direction: 'right' //设置文本标注方位
      });
      // 将 markers 添加到地图
      this.markers.push(marker)
    },
    // 删除之前后的标记点
    removeMarker () {
      if (this.markers) {
        this.map.remove(this.markers)
      }
    },
      
    pay(){
        window.location.href="http://101.37.12.216:3000/#/dashboard/pay"
    },
    //IP定位
    IPToGPS(){
      re.IPToGPS(this.ip,this.addressQuery)
        .then(response => {
          // cookie.set('address',response.data.address,{domain: '101.37.12.216'})
          cookie.set('address',response.data.address,{domain: 'localhost'})
          this.address = cookie.get('address')
          // cookie.set('IP',response.data.IP,{domain: '101.37.12.216'})
          // cookie.set('adcode',response.data.adcode,{domain: '101.37.12.216'})
          // cookie.set('lng',response.data.longitude,{domain: '101.37.12.216'})
          // cookie.set('lat',response.data.latitude,{domain: '101.37.12.216'})
          // cookie.set('endlng',response.data.longitude,{domain: '101.37.12.216'})
          // cookie.set('endlat',response.data.latitude,{domain: '101.37.12.216'})
          cookie.set('IP',response.data.IP,{domain: 'localhost'})
          cookie.set('adcode',response.data.adcode,{domain: 'localhost'})
          cookie.set('lng',response.data.longitude,{domain: 'localhost'})
          cookie.set('lat',response.data.latitude,{domain: 'localhost'})
          cookie.set('endlng',response.data.longitude,{domain: 'localhost'})
          cookie.set('endlat',response.data.latitude,{domain: 'localhost'})
          this.$message({
                  type: 'success',
                  message: 'IP定位成功!'
          })
          this.mapInit()
        })
    },
    //输入地址更改信息
    changeAddress(){
      provide.parking_ll(this.address,this.addressQuery)
      .then(response => {
        // cookie.set('address',this.address,{domain: '101.37.12.216'})
        cookie.set('address',this.address,{domain: 'localhost'})
        this.address = cookie.get('address')
        // cookie.set('adcode',response.data.adcode,{domain: '101.37.12.216'})
        // cookie.set('lng',response.data.longitude,{domain: '101.37.12.216'})
        // cookie.set('lat',response.data.latitude,{domain: '101.37.12.216'})
        // cookie.set('endlng',response.data.longitude,{domain: '101.37.12.216'})
        // cookie.set('endlat',response.data.latitude,{domain: '101.37.12.216'})
        cookie.set('adcode',response.data.adcode,{domain: 'localhost'})
        cookie.set('lng',response.data.longitude,{domain: 'localhost'})
        cookie.set('lat',response.data.latitude,{domain: 'localhost'})
        cookie.set('endlng',response.data.longitude,{domain: 'localhost'})
        cookie.set('endlat',response.data.latitude,{domain: 'localhost'})
        this.$message({
                  type: 'success',
                  message: '修改地址成功!'
        })
        this.mapInit()
      })
    },
    //点击地图修改定位
    click(lng,lat){
      provide.parking_adcode(lng,lat,this.addressQuery)
        .then(response => {
            cookie.set('address',response.data.address,{domain: '101.37.12.216'})
            cookie.set('adcode',response.data.adcode,{domain: '101.37.12.216'})
            cookie.set('lng',lng,{domain: '101.37.12.216'})
            cookie.set('lat',lat,{domain: '101.37.12.216'})
            cookie.set('endlng',lng,{domain: '101.37.12.216'})
            cookie.set('endlat',lat,{domain: '101.37.12.216'})
            // cookie.set('address',response.data.address,{domain: 'localhost'})
            // cookie.set('adcode',response.data.adcode,{domain: 'localhost'})
            // cookie.set('lng',lng,{domain: 'localhost'})
            // cookie.set('lat',lat,{domain: 'localhost'})
            // cookie.set('endlng',lng,{domain: 'localhost'})
            // cookie.set('endlat',lat,{domain: 'localhost'})
            this.address = cookie.get('address')
            this.$message({
                  type: 'success',
                  message: '修改地址成功!'
            })
            this.mapInit()
        })
    },
    showInfo(){
      this.show = !this.show
      if(!this.show){
        this.init()
      }
    },
    //修改个人信息根据ID
    updateUserDetailsByID(){
      home1.updateUserDetailsByID(this.token.id,this.token.productNo,this.loginInfo)
      .then(response => {
        this.$message({
                  type: 'success',
                  message: '修改成功!'
        })
      })
    },

    //页面加载初始化个人数据
      init(){
        //查询个人信息
        home.findByProductNo(this.token.productNo,this.userQuery)
        .then(response => {
          this.list = response.data.records
          this.loginInfo.id = response.data.id
          this.loginInfo.name = response.data.name
          this.loginInfo.productNo = response.data.productNo
          this.loginInfo.sex = response.data.sex
          this.loginInfo.money = response.data.money
          this.loginInfo.cardId = response.data.cardId
          this.loginInfo.carId1 = response.data.carId1
          this.loginInfo.carId2 = response.data.carId2
          this.loginInfo.carId3 = response.data.carId3
          this.loginInfo.userCreatetime = response.data.userCreatetime
        })
      },

  },

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

//卡片样式
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
//文本样式区
  .name-role {
    font-size: 16px;
    padding: 5px;
   text-align:center;
  }
   .sender{
      text-align:center;
    }
.registe-info{
  text-align: center;
  padding-top:10px;
}
.personal-relation {
  font-size: 16px;
  padding: 0px 5px 15px;
  margin-right: 1px;
    width: 100%
}

.relation-item {
  padding: 12px;
   
}
.dialog-footer{
  padding-top:10px ;
  padding-left: 10%;
}
//布局样式区
   .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
