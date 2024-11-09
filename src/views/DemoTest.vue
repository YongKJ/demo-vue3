<template>
  <wallpaper type="snow" color="208,233,242" :bg-img="WallpaperImage.BACKGROUND_THREE">

    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">Demo Test</h3>

      <el-form-item style="width: 100%">
        <el-button type="primary" class="button-border" @click="demoTestService.quillDemo()">
          Quill@1.3.7 Demo
        </el-button>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button type="primary" class="button-border-red" @click="demoTestService.vditorDemo()">
          Vditor@3.10.7 Demo
        </el-button>
      </el-form-item>
    </el-form>

    <Suspense>
      <div>
        <markdown-edit-plus v-if="demoTestService.markdownEditPlusVisible" />
        <rich-text-edit-plus v-if="demoTestService.richTextEditPlusVisible" />
      </div>
    </Suspense>
  </wallpaper>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import Wallpaper from "@/components/Wallpaper.vue";
import { DemoTestService } from "@/common/service/DemoTestService";
import { WallpaperImage } from "@/common/pojo/po/WallpaperImage";

const RichTextEditPlus = defineAsyncComponent(() => import('@/components/RichTextEditPlus.vue'));
const MarkdownEditPlus = defineAsyncComponent(() => import('@/components/MarkdownEditPlus.vue'));

export default defineComponent({
  name: "DemoTest",
  data() {
    return {
      WallpaperImage: WallpaperImage,
      demoTestService: new DemoTestService(this)
    }
  },
  mounted() {
    this.demoTestService.initData();
  },
  components: {
    Wallpaper,
    RichTextEditPlus,
    MarkdownEditPlus,
  }
});
</script>

<style scoped>
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
  border: 1px solid #40E0D0;
}

.button-border:hover {
  width: 100%;
  background: rgba(45, 45, 45, 0.33);
  border: 1px solid #40E0D0;
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