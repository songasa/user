<template>
    <div>
        <el-radio-group v-model="status" @change="agreeChange">
            <el-radio v-model="status" label="1">查看已完成订单</el-radio>
            <el-radio v-model="status" label="0">查看进行中订单</el-radio>
        </el-radio-group>
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
                <el-table-column prop="parkingUsetimeBegin" label="预约时间" width="160" sortable></el-table-column>
                <el-table-column v-if="btnstatus" prop="parkingUsetimeEnd" label="预计结束时间" width="160" sortable></el-table-column>
                <el-table-column v-if="btnstatus" prop="price" label="价格(元/小时)" width="150" sortable></el-table-column>
                <el-table-column v-if="!btnstatus" prop="actualtime" label="实际结束时间" width="160" sortable></el-table-column>
                <el-table-column v-if="!btnstatus" prop="earning" label="费用(元)" width="160" sortable></el-table-column>

                <el-table-column v-if="btnstatus" label="操作" width="500" align="center">
                <template slot-scope="scope">              
                <el-button type="primary" size="mini" icon="el-icon-edit"  
                @click="finishOrder(scope.row.id,scope.row.parkingNo,scope.row.parkingDetailsNote,
                scope.row.parkingUsetimeBegin,scope.row.parkingUsetimeEnd,scope.row.price,scope.row.ownerProductNo)">结算</el-button>
                <el-button type="primary" size="mini" icon="el-icon-edit"  
                @click="reOrder(scope.row.id,scope.row.parkingNo,scope.row.parkingDetailsNote,
                scope.row.parkingUsetimeBegin,scope.row.parkingUsetimeEnd,scope.row.price,scope.row.ownerProductNo)">续时</el-button>
                <el-button type="primary" size="mini" icon="el-icon-edit"  
                @click="outOrder(scope.row.id,scope.row.parkingNo,scope.row.parkingDetailsNote,
                scope.row.parkingUsetimeBegin,scope.row.parkingUsetimeEnd,scope.row.price,scope.row.ownerProductNo)">退订</el-button>
                <el-button type="info" size="mini" icon="el-icon-info"  
                @click="driver(scope.row.parkingNo)">导航</el-button>
                <el-button type="info" size="mini" icon="el-icon-info"  
                @click="showCode(scope.row)">二维码</el-button>
                <el-dialog title="结算信息" :visible.sync="dialogFormVisible">
                    <el-form>
                        <el-form-item label="停车位地址" :label-width="formLabelWidth">
                        <el-input v-model="list.parkingDetailsNote" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="开始时间" :label-width="formLabelWidth">
                        <el-input v-model="list.parkingUsetimeBegin" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="预计结束时间" :label-width="formLabelWidth">
                        <el-input v-model="list.parkingUsetimeEnd" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="实际结束时间" :label-width="formLabelWidth">
                        <el-input v-model="actualtime" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="费用(元)" :label-width="formLabelWidth">
                        <el-input v-model="earn" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submit">确 认</el-button>
                    </div>
                    </el-dialog>
                    <el-dialog title="停车位续时" :visible.sync="dialogFormVisible1">
                    <el-form>
                        <el-form-item label="停车位地址" :label-width="formLabelWidth">
                        <el-input v-model="list.parkingDetailsNote" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="开始时间" :label-width="formLabelWidth">
                        <el-input v-model="list.parkingUsetimeBegin" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="预计结束时间" :label-width="formLabelWidth">
                        <el-input v-model="list.parkingUsetimeEnd" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="续费时间" :label-width="formLabelWidth">
                        <el-date-picker
                        v-model="list.reparkingUsetimeEnd"
                        type="datetime"
                        placeholder="请选择24小时之内的时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        />
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                        <el-button type="primary" @click="resubmit">确 认</el-button>
                    </div>
                    </el-dialog>
                    <el-dialog title="是否退订该停车位" :visible.sync="dialogFormVisible2">
                        <el-form>
                        <el-form-item label="费用(元)" :label-width="formLabelWidth">
                        <el-input v-model="earn" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                        <el-button type="primary" @click="outsubmit">确 认</el-button>
                    </div>
                    </el-dialog>
                </template>
                </el-table-column>
            </el-table>
            <el-dialog
                        width="30%"
                        title="展示二维码"
                        @close="closeCode"
                        :visible.sync="dialogVisible"
                        append-to-body>
                        <div class="content">
                            <!-- 放置二维码的容器,需要给一个ref -->
                            <div id="qrcode" ref="qrcode"></div>
                        </div>
                    </el-dialog>
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
import order from '@/api/home/orders'
import cookie from 'js-cookie'
import dateFormat from '@/utils/date'
import { login, logout, getInfo ,getInfoByToken } from '@/api/login'
import home from '@/api/home/findByProductNo'
import QRCode from "qrcodejs2";

export default{
    data(){
        return{
            dialogVisible: false,
            //token
            token: {
                productNo:'',
                id:'',
            },
                status: '0',
                btnstatus:true,
                page:1,//当前页
                limit:10,//每页的记录数
                total:0,//总记录数
                list:null,      //查询数据库返回结果
                dialogFormVisible: false,
                productNo:'',
                // parkingLogsQuery: {},
                dialogFormVisible: false,
                dialogFormVisible1: false,
                dialogFormVisible2: false,
                reparkingUsetimeEnd:'', //续费时间
                actualtime:'',  //实际结束时间
                earn:'',
                times:'',
                //后端的条件封装对象
                userQuery: {},
                isPay:false,
        }
    },

    created(){
        getInfoByToken()
        .then(response1 => {
          this.token.productNo = response1.data.user.productNo
          this.token.id = response1.data.user.id
          this.getList()
        })
    },

    methods:{
        // 展示二维码
        showCode(row) {
            this.dialogVisible = true
            // 二维码内容
            this.qrcode =  `订单编号:${row.id}
                            停车位编号:${row.parkingNo}`
            // console.log(row.id)
            // console.log(row.parkingNo)
            // 使用$nextTick确保数据渲染
            this.$nextTick(() => {
            this.createQrcode()
            })
        },
        // 生成二维码
        createQrcode() {
            this.qr = new QRCode('qrcode', {
            width: 150,
            height: 150, // 高度
            text: this.qrcode // 二维码内容
            })
            // console.log(this.qrcode)
        },
        // 关闭弹框,清除已经生成的二维码
        closeCode () {
            this.$refs.qrcode.innerHTML = ''
        },
        //导航
        driver(parkingNo){
            order.getByParkingNo(parkingNo)
            .then(response => {
                var lng = response.data.parking.parkingDetailsLongitude
                var lat = response.data.parking.parkingDetailsLatitude
                // cookie.set('endlng',lng,{domain: '101.37.12.216'})
                // cookie.set('endlat',lat,{domain: '101.37.12.216'})
                cookie.set('endlng',lng,{domain: 'localhost'})
                cookie.set('endlat',lat,{domain: 'localhost'})
                // window.location.href=`http://localhost:9527/#/amap/driver`
                window.location.href=`http://101.37.12.216:3000/#/amap/driver`
            })
        },
            outsubmit(){
                order.setStatusByID(this.list.id)
                .then(response => {
                    if(this.times<0){
                        this.times = 0;
                    }
                    order.setEarningsByParkingNo(this.list.parkingNo,this.earn+"",parseInt(this.times)+"")
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '退订成功!'
                        })
                        this.getList()
                        this.dialogFormVisible2 = false
                    })
                })    
            },
            resubmit(){
                var currenttime = Date.now();
                if(dateFormat.zhuanhuan(this.list.reparkingUsetimeEnd) > currenttime &&
                dateFormat.zhuanhuan(this.list.reparkingUsetimeEnd) < currenttime + 86400000 ){
                    order.setReTimeByID(this.list.id,this.list.reparkingUsetimeEnd)
                    .then(response => {
                        this.$message({
                                type: 'success',
                                message: '续时成功!'
                            })
                        this.getList()
                        this.dialogFormVisible1 = false
                    })
                }else{
                    alert('续费时间请保证在当前24小时之内!')
                }
            },
            submit(){
                home.findByProductNo(this.token.productNo,this.userQuery)
                .then(response => {
                    //判断余额是否够用
                    if(parseInt(response.data.money) >= this.earn){
                        if(this.times<0){
                            this.times = 0;
                        }
                        order.setEarningsByParkingNo(this.list.parkingNo,this.earn+"",parseInt(this.times)+"")
                        .then(response => {
                            // console.log(this.actualtime)
                            order.setEarningByID(this.list.id,this.earn,this.actualtime)
                            .then(response => {
                                // console.log(this.list.ownerProductNo,this.earn)
                                order.updateUserMoneyByID(this.token.id,this.token.productNo,this.earn)
                                .then(response => {
                                    this.$message({
                                        type: 'success',
                                        message: '结算成功,欢迎下次使用!'
                                    })
                                    order.updateUserMoneyByProductNo(this.list.ownerProductNo,this.earn)
                                    this.getList()
                                    this.dialogFormVisible = false
                                })
                            })
                        })
                    }else{
                        this.dialogFormVisible = false
                        var payMoney = this.earn - parseInt(response.data.money)
                        window.location.href=`http://101.37.12.216:3000/#/dashboard/pay?pay=${payMoney}`
                    }
                })
            },
            outOrder(id,parkingNo,parkingDetailsNote,parkingUsetimeBegin,parkingUsetimeEnd,price,ownerProductNo){
                this.dialogFormVisible2 = true
                this.list.id = id
                    this.list.parkingNo = parkingNo
                    this.list.parkingDetailsNote = parkingDetailsNote
                    this.list.parkingUsetimeBegin = parkingUsetimeBegin
                    this.list.parkingUsetimeEnd = parkingUsetimeEnd
                    this.list.ownerProductNo = ownerProductNo 
                    this.actualtime = dateFormat.dateFormat(new Date())
                    this.times = dateFormat.mmToHour((
                        parseInt(dateFormat.zhuanhuan(this.actualtime))
                     -  parseInt(dateFormat.zhuanhuan(this.list.parkingUsetimeBegin))
                     ))
                    this.earn = parseInt(price) * parseInt(this.times)
                    if(this.earn>0){
                        alert('已开始计费,请直接点击结算按钮!')
                        this.dialogFormVisible2 = false
                    }else{
                        this.earn = 0
                    }
            },
            reOrder(id,parkingNo,parkingDetailsNote,parkingUsetimeBegin,parkingUsetimeEnd){
                this.dialogFormVisible1 = true
                this.list.id = id
                this.list.parkingNo = parkingNo
                this.list.parkingDetailsNote = parkingDetailsNote
                this.list.parkingUsetimeBegin = parkingUsetimeBegin
                this.list.parkingUsetimeEnd = parkingUsetimeEnd
            },
            finishOrder(id,parkingNo,parkingDetailsNote,parkingUsetimeBegin,parkingUsetimeEnd,price,ownerProductNo){
                    this.dialogFormVisible = true
                    this.list.id = id
                    this.list.parkingNo = parkingNo
                    this.list.parkingDetailsNote = parkingDetailsNote
                    this.list.parkingUsetimeBegin = parkingUsetimeBegin
                    this.list.parkingUsetimeEnd = parkingUsetimeEnd
                    this.list.ownerProductNo = ownerProductNo                  
                    this.actualtime = dateFormat.dateFormat(new Date())
                    this.times = dateFormat.mmToHour((
                        parseInt(dateFormat.zhuanhuan(this.actualtime))
                     -  parseInt(dateFormat.zhuanhuan(this.list.parkingUsetimeBegin))
                     ))
                    this.earn = parseInt(price) * parseInt(this.times)
                    if(this.earn<0){
                        this.earn = 0
                    }
            },
            agreeChange(val){
                this.btnstatus=(val==='0')?true:false;
                this.getList()
            },
            getList(page = 1){
                this.page = page
                this.listLoading = true
                // console.log(this.page,this.limit,this.productNo,this.status)
                order.parkingLogsFindByProductNo(this.page,this.limit,this.token.productNo,this.status)
                .then(response => {
                    // console.log(response.data)
                    this.list = response.data.records
                    // console.log(this.list)
                    this.total = response.data.total
                    this.listLoading = false
                })
            },
    },

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