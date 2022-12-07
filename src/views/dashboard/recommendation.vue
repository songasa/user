<template>
    <div>
        <div>
            <div id="container" style="width: 100%;height: 550px"></div>
        </div>
        <div>
        <el-radio-group v-model="radio" @change="agreeChange">
            <el-radio v-model="radio" label="1">查看本市</el-radio>
            <el-radio v-model="radio" label="0">查看本区县</el-radio>
        </el-radio-group>
        </div>
        <div>
        <el-radio-group v-model="radio1" @change="agreeChange1">
            <el-radio v-model="radio1" label="-1">距离不限</el-radio>
            <el-radio v-model="radio1" label="5">5km以内</el-radio>
            <el-radio v-model="radio1" label="10">10km以内</el-radio>
        </el-radio-group>
        </div>
      <template>
            <el-table
                v-loading="listLoading"
                :data="list"
                element-loading-text="数据加载中"
                stripe
                style="width: 100%"
                :default-sort = "{prop: 'distince', order: 'descending'}">

                <el-table-column label="序号" width="70" align="center">
                <template slot-scope="scope">
                {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
                </el-table-column>
                <el-table-column prop="parkingDetailsNote" label="地址" width="160" sortable></el-table-column>
                <el-table-column prop="price" label="价格(元/小时)" width="150" sortable></el-table-column>
                <el-table-column prop="distince" label="距离(米)" width="100" sortable></el-table-column>
                <el-table-column prop="count" label="剩余车位" width="100" sortable></el-table-column>

                <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">                    
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="orderParking(scope.row.parkingDetailsNote,scope.row.price,scope.row.ownerProductNo)">预定</el-button>
                    <el-dialog title="选择停车位租用时间(可手动修改年月日)" :visible.sync="dialogFormVisible">
                    <el-form>
                        <el-form-item label="停车位地址" :label-width="formLabelWidth">
                        <el-input v-model="form.parkingDetailsNote" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="租用开始时间" :label-width="formLabelWidth">
                        <el-date-picker
                        v-model="form.parkingUsetimeBegin"
                        type="datetime"
                        placeholder="请选择24小时之内的时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        />
                        </el-form-item>
                        <el-form-item label="租用结束时间" :label-width="formLabelWidth">
                        <el-date-picker
                        v-model="form.parkingUsetimeEnd"
                        type="datetime"
                        placeholder="租用预计结束时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        />
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submit">确认预约</el-button>
                    </div>
                    </el-dialog>
                </template>
                </el-table-column>
            </el-table>
        </template>

              <!-- 分页 -->
                <el-pagination
                :current-page="page"
                :page-size="limit"
                :total="total"
                style="padding: 30px 0; text-align: center;"
                layout="total, prev, pager, next, jumper"
                @current-change="getList"
                />
    </div>
</template>

<script>
import re from '@/api/home/recommendation'
import cookie from 'js-cookie'
import provide from '@/api/home/provideParking'
import dateFormat from '@/utils/date' 
import { login, logout, getInfo ,getInfoByToken } from '@/api/login'
    export default{
        data(){
            return{
                //距离
                
                markers: [],
                //token
                token: {
                    productNo:'',
                    id:'',
                },
                radio: '0',
                radio1: '-1',
                btnstatus:true,
                page:1,//当前页
                limit:10,//每页的记录数
                total:0,//总记录数
                ip:'',      //IP
                adcode:'',  //城市编码
                address:'', //地址信息
                longitude:null,//精度
                latitude:null,  //纬度
                addressQuery:{},       //后端返回对象经纬度和address
                addressDetailsQuery:{},//后端返回的详细地址
                list:null,      //查询数据库返回结果
                dialogFormVisible: false,
                form: {
                    parkingNo:'', //日志数据
                    productNo:'', //日志数据
                    parkingDetailsNote: '', //日志数据
                    parkingUsetimeBegin: '', //日志数据
                    parkingUsetimeEnd: '', //日志数据
                    // type: [],
                    appoint: 1, //设置被预约
                    logLevel:'2', //日志数据
                    status:'0', //日志数据
                    price:'',   //日志数据
                    ownerProductNo:''   //日志数据
                },
            }
        },

        created(){            
            getInfoByToken()
            .then(response1 => {
                this.token.productNo = response1.data.user.productNo
                this.token.id = response1.data.user.id
                provide.parking_ll(cookie.get('address'),this.addressQuery)
                .then(response => {
                    this.address = cookie.get('address')
                    this.adcode = response.data.adcode
                    this.longitude = response.data.longitude
                    this.latitude = response.data.latitude
                    this.getList()
                    dialogFormVisible = false
                })
            })
        },

        methods:{
            clickToMark(){
                this.map = new AMap.Map('container', {resizeEnable: true  ,zoom: 14 , center: [cookie.get('lng'),cookie.get('lat')]})
                for(var i=0;i<this.list.length+1;i++){
                    if(i===this.list.length){
                        let marker = new AMap.Marker({
                        map: this.map,
                        position: [cookie.get('lng'),cookie.get('lat')],
                        offset: new AMap.Pixel(0, 0),
                        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
                        })
                        //设置标签
                        marker.setLabel({
                            offset: new AMap.Pixel(0, 0),  //设置文本标注偏移量
                            content: '您的当前定位: '+cookie.get('address'), //设置文本标注内容
                            direction: 'right' //设置文本标注方位
                        });
                        // 将 markers 添加到地图
                        this.markers.push(marker)
                    }else{
                        this.setMapMarker(this.list[i].parkingDetailsLongitude,this.list[i].parkingDetailsLatitude,
                        this.list[i].parkingDetailsNote+' 价格: '+this.list[i].price+' 元 '+' 距离您: '+this.list[i].distince+'米')
                    }
                }
                },
                // 设置点击位置的标记
                setMapMarker (lng,lat,address) {
                let marker = new AMap.Marker({
                    map: this.map,
                    position: [lng,lat],
                    offset: new AMap.Pixel(0, 0)
                })
                //设置标签
                marker.setLabel({
                    offset: new AMap.Pixel(0, 0),  //设置文本标注偏移量
                    content: `${address}`, //设置文本标注内容
                    direction: 'right' //设置文本标注方位
                });
                // 将 markers 添加到地图
                this.markers.push(marker)
                },

            submit(){
                var currenttime = Date.now();
                if(this.form.parkingUsetimeBegin<this.form.parkingUsetimeEnd && 
                dateFormat.zhuanhuan(this.form.parkingUsetimeBegin) > currenttime &&
                dateFormat.zhuanhuan(this.form.parkingUsetimeBegin) < currenttime + 86400000 ){
                    re.parkingDetailsFindByAddress(this.form.parkingDetailsNote,this.form.price,this.addressDetailsQuery)
                    .then(response => {
                    this.form.parkingNo = response.data.parkingNo
                    this.form.productNo = this.token.productNo
                    re.setAppointByParkingNo(this.form.parkingNo,this.form.appoint)
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '租用成功!'
                        })
                        this.getList()
                        // console.log(this.form)
                        re.addParkingLogs(this.form)
                        this.dialogFormVisible = false
                    })
                })
                }else{
                    alert('起止时间选择错误!')
                }
            },
            orderParking(parkingDetailsNote,price,ownerProductNo){               
                this.dialogFormVisible = true
                this.form.parkingDetailsNote = parkingDetailsNote
                this.form.price = price
                this.form.ownerProductNo = ownerProductNo
            },
            agreeChange(val){
                let that = this 
                that.btnstatus=(val==='1')?true:false;
                that.getList()
            },
            agreeChange1(val){
                let that = this 
                that.btnstatus=(val==='1')?true:false;
                that.getList()
            },
            getList(page = 1){
                this.page = page
                this.listLoading = true
                var currenttime = dateFormat.dateFormat(new Date())
                // console.log(currenttime)
                re.parkingDetailsFindadcode(this.page,this.limit,this.adcode,this.longitude,this.latitude,this.radio,this.radio1,currenttime,this.addressDetailsQuery)
                .then(response => {
                    this.list = response.data.records
                    this.total = response.data.total
                    // console.log(this.list)
                    //车位标记
                    this.clickToMark()
                    this.listLoading = false
                })
            },

        },

    }
</script>

<style>
        .btn {
            position: relative;
            width: 12rem;
            left: 3.6rem;
            margin: 10px 0 0 0;
        }
</style>