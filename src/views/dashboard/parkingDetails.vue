<template>
<div>
    <div v-if="!show">
      <template>
            <el-table
                v-loading="listLoading"
                :data="list"
                element-loading-text="数据加载中"
                stripe
                style="width: 100%"
                :default-sort = "{prop: 'earning', order: 'descending'}">>

                <el-table-column label="序号" width="70" align="center">
                <template slot-scope="scope">
                {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
                </el-table-column>
                
                <el-table-column prop="parkingDetailsNote" label="地址" width="160" sortable></el-table-column>
                <el-table-column prop="productNo" label="手机号" width="160" sortable></el-table-column>
                <el-table-column prop="parkingUsetimeBegin" label="开始时间" width="100" sortable></el-table-column>
                <el-table-column prop="actualtime" label="结束时间" width="100" sortable></el-table-column>
                <el-table-column prop="price" label="价格(元/小时)" width="140" sortable></el-table-column>
                <el-table-column label="使用状态" width="100" sortable>
                        <template slot-scope="scope">
                        <span v-if="scope.row.status==0">在使用</span>
                        <span v-if="scope.row.status==1">已完成</span>
                        <span v-else>{{scope.row.key}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="earning" label="收益" width="90" sortable></el-table-column>

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
    
</div>
</template>

<script>
import provide from '@/api/home/provideParking'
import cookie from 'js-cookie'
import re from '@/api/home/recommendation'
import { login, logout, getInfo ,getInfoByToken } from '@/api/login'
  export default {

    created(){
      getInfoByToken()
        .then(response1 => {
          this.token.productNo = response1.data.user.productNo
          this.token.id = response1.data.user.id
          //调用
          this.getList()
        })
    },

    //
    methods: {
      //查看停车位
      getList(page = 1){
        // this.show = !this.show
        if(!this.show){
          this.page = page
          this.listLoading = true
          provide.parkingLogsFindByParkingNo(this.page,this.limit,cookie.get('parkingNo'),this.parkingDetailsQuery)
          .then(response => {//请求成功
                      this.list = response.data.records
                      this.total = response.data.total
                      this.listLoading = false
                  })
                  .catch(error => {//请求失败
                      this.listLoading = false
                  })
        }
        
      },


      //

    },

    data() {
      return {
        //token
        token: {
          productNo:'',
          id:'',
        },
        parkingNo:'',
        dialogFormVisible: false,
        show: false,    //查看修改停车位展示
        list:null,//查询之后返回的结果
        page:1,//当前页
        limit:10,//每页的记录数
        total:0,//总记录数
        parkingDetailsQuery:{},//后端的条件封装对象

        thsAreaCode:'', // 拼接 三级联动地址代码   
        addressDetails:'',     //详细地址
        address:'',            //地址拼接
        addressQuery:{},       //后端返回对象经纬度和address
       }
    },

  }
</script>