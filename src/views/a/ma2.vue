<template>
  <div>
    <el-button type="primary" @click="showCode">生成二维码</el-button>
    <el-dialog
        width="30%"
        title="二维码弹框展示"
        @close="closeCode"
        :visible.sync="dialogVisible"
        append-to-body>
        <div class="content">
            <!-- 放置二维码的容器,需要给一个ref -->
            <div id="qrcode" ref="qrcode"></div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
      dialogVisible:false,
    };
  },

  created() {
     
  },

  beforeMount() {
    
  },

  methods: {
    // 展示二维码
  showCode() {
    this.dialogVisible = true
    // 二维码内容
    this.qrcode = '123'
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
      // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      // background: '#f0f'
      // foreground: '#ff0'
    })
    // console.log(this.qrcode)
  },
  // 关闭弹框,清除已经生成的二维码
  closeCode () {
    this.$refs.qrcode.innerHTML = ''
  }

  },
};
</script>