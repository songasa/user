<template>
  <div>
    <el-button type="primary" round @click="this.dialogFormVisible1=true">查看并修改个人信息</el-button>
    <Verify
                ref="loginVerifyRef"
                :type="2"
                @error="error"
                :showButton="true"
                @success="success"
                :width="'20%'"
                :height="'40px'"
                :fontSize="'16px'"
              >
      </Verify>

    <!-- 点击找回密码按钮弹出表单 -->
      <el-dialog title="人机验证" :visible.sync="dialogFormVisible1">
        <h1>asasa</h1>
      </el-dialog>
  </div>
</template>

<script>
import Verify from "vue2-verify"; 
export default {
  date(){
    return{
      dialogFormVisible1:false,
    }
  },
  components: {
    Verify,
  },
  methods: {
    error(obj) {
      this.verify = false;
      obj.refresh();
      console.log(1)
    },
    success(obj) {
      this.verify = true;
      obj.refresh();
      console.log(2)
    },
  }
}
</script>