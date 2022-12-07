<template>
  <div>
    <div id="qrcode" ref="qrcode" />   
  </div>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
    };
  },

  created() {
      console.log(2)
    this.crateQrcode(); //先生成二维码
  },

  beforeMount() {
      console.log(1)
    this.payOrder(); //把信息写入二维码
  },

  methods: {
    // 把信息写入二维码
    payOrder() {
      this.innerVisible = true;
      this.qrcode = this.link;
      this.$nextTick(() => {
        this.crateQrcode();
      });
    },
    // 生成二维码
    crateQrcode() {
      this.qr = new QRCode("qrcode", {
        width: 150, //宽度
        height: 150,            // 高度
        text: '可可我爱你',      // 二维码内容
        render: "table",        // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      });
    },

    
  },
};
</script>