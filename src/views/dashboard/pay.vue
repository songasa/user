<template>
    <div>
        <el-form label-width="120px">
        <el-form-item label="充值金额">
          <el-col :span='2'>
            <el-input v-model="parkingLogs.price" placeholder="元"/>
          </el-col>
          <el-button style="width:20%;" type="text" @click="home">查看个人信息及余额</el-button>
        </el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" style="width:20%;" @click="pay">确 认</el-button>
        <el-button style="width:20%;" type="primary" @click="saveBtnDisabled=false">继续充值</el-button>
    </el-form>
        <el-dialog title="扫码充值" :visible.sync="dialogFormVisible">
            <img :src="require('@/views/dashboard/images/wx.png')"  style="width:150px; height:200px"/>
            <img :src="require('@/views/dashboard/images/zfb.png')"  style="width:150px; height:200px"/>
            <img :src="require('@/views/dashboard/images/qq.png')"  style="width:150px; height:200px"/>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import pay from '@/api/home/pay'
import cookie from 'js-cookie'
import { login, logout, getInfo ,getInfoByToken } from '@/api/login'
export default{
    data(){
        return{
            //token
            token: {
                productNo:'',
                id:'',
            },
            saveBtnDisabled:false,
            dialogFormVisible:false,
            parkingLogs:{
                logLevel:'3',
                ownerProductNo:'',
                price:'',
            },
        }
    },
    created(){
        getInfoByToken()
        .then(response1 => {
          this.token.productNo = response1.data.user.productNo
          this.token.id = response1.data.user.id
          this.parkingLogs.price = this.$route.query.pay
          if(this.parkingLogs.price==='0' || this.parkingLogs.price==null){
          }else{
            this.$message({
                 type: 'error',
                 message: `余额不足,请充值!`
            })
            this.saveBtnDisabled = true
            this.dialogFormVisible = true
            this.parkingLogs.ownerProductNo = this.token.productNo
          }
        })
    },
    methods:{
        home(){
            window.location.href="http://101.37.12.216:3000/#/dashboard"
            // window.location.href=`http://localhost:9527/#/dashboard?show=false`
        },
        pay(){
            // console.log(this.parkingLogs.price)
            if(this.parkingLogs.price==='0' || this.parkingLogs.price==='' || this.parkingLogs.price==null){
                this.$message({
                    type: 'error',
                    message: '请输入充值金额'
                })
            }else{
                this.saveBtnDisabled = true
                this.dialogFormVisible = true
                this.parkingLogs.ownerProductNo = this.token.productNo
            }
        },
        submit(){
            pay.addParkingLogs(this.parkingLogs)
            .then(response =>{
                pay.updateUserMoneyByProductNo(this.parkingLogs.ownerProductNo,this.parkingLogs.price)
                .then(response => {
                    this.$message({
                    type: 'success',
                    message: '充值成功,请等待服务人员核实确认!'
                })
                this.saveBtnDisabled = false
                this.dialogFormVisible = false
                })
            })
        },
    },

}
</script>