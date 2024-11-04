<template>
  <wallpaper color="208,233,242" type="snow">
    <el-button style="position: relative" @click="demoTestService.test()">
      终端实时通信测试
    </el-button>

  </wallpaper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Wallpaper from "@/components/Wallpaper.vue";
import { DemoTestService } from "@/common/service/DemoTestService";

export default defineComponent({
  name: "DemoTest",
  data() {
    return {
      demoTestService: new DemoTestService(this)
    }
  },
  mounted() {
    this.demoTestService.initData();
  },
  components: {
    Wallpaper,
  }
});
</script>

<style scoped>
:deep(.el-input--large .el-input__wrapper) {
  padding: 1px 0;
}

:deep(.el-input__inner) {
  padding: 0 15px;
  border-radius: 4px;
}

.avatar-uploader-icon-computer {
  font-size: 70px;
  color: #C0C4CC;
  position: relative;
  top: 8px;
  text-align: center;
}

:deep(.el-upload) {
  --el-upload-dragger-padding-horizontal: 26.5px;
  --el-upload-dragger-padding-vertical: 10px;
}

/deep/ .el-upload-list__item-name:hover {
  color: #606266;
}

/deep/ .el-upload-list__item-name {
  color: white;
}

/deep/ .el-upload-dragger {
  width: 330px;
}

.button {
  width: 100px;
  height: 20px;
  position: relative;
}

.login-container {
  width: 402px;
  margin: 90px auto;
  position: relative;
  border-radius: 15px;
  border: 1px solid #eaeaea;
  padding: 35px 35px 15px 35px;
  background-clip: padding-box;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 25px rgba(155, 89, 182, .5);
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #f3f9f1;
  user-select: none;
  font-size: 32px;
  font-weight: 500;
}

.button-border {
  width: 100%;
  background: rgba(45, 45, 45, 0.33);
  /*   border: none; */
  border: 1px solid #40E0D0;
  /*   box-shadow: 0 0 25px rgba(155,89,182,.5); */
  /*   box-shadow: 0 0 25px rgba(64,224,208,.5); */
}

.button-border:hover {
  width: 100%;
  background: rgba(45, 45, 45, 0.33);
  /*   border: none; */
  border: 1px solid #40E0D0;
  /*   box-shadow: 0 0 25px rgba(155,89,182,.5); */
  box-shadow: 0 0 25px rgba(64, 224, 208, .5);
}

.button-border-red {
  width: 100%;
  background: rgba(45, 45, 45, 0.33);
  border: 1px solid #E74C3C;
}

.button-border-red:hover {
  width: 100%;
  background: rgba(45, 45, 45, 0.33);
  border: 1px solid #E74C3C;
  box-shadow: 0 0 25px rgba(236, 112, 99, .5);
}
</style>