<template>
  <div v-if="richTextEditPlusService.screen === 'fit' && richTextEditPlusService.visible">
    <quill-editor theme="snow" contentType="html" @ready="richTextEditPlusService.initViewerEditor"
      v-model:content="richTextEditPlusService.rtContent" :options="richTextEditPlusService.getViewerOptions()" />
  </div>
  <div class="video-container" v-if="richTextEditPlusService.screen === 'full' && richTextEditPlusService.visible">
    <div class="video" :style="{
      top: richTextEditPlusService.top + 'px',
      left: richTextEditPlusService.left + 'px',
      width: richTextEditPlusService.width + 'px',
      height: richTextEditPlusService.height + 'px',
    }">
      <quill-editor theme="snow" contentType="html" :modules="richTextEditPlusService.modules"
        @ready="richTextEditPlusService.initEditor" :toolbar="richTextEditPlusService.toolbarOption"
        v-model:content="richTextEditPlusService.rtContent" :options="richTextEditPlusService.getOptions()" :style="{
          height: richTextEditPlusService.height + 'px',
          overflow: 'hidden',
        }" />
    </div>
    <div class="video-bottombar">
      <ul id="pv-buttons">
        <li id="pv-bar-close" class="bar-right bar-button" @click="richTextEditPlusService.closeRichText()">
          <img :src="VideoImage.previewClose" class="img" alt="" />
        </li>
        <li id="pv-bar-raw" class="bar-right bar-button" @click="richTextEditPlusService.saveRTContent()"
          v-if="richTextEditPlusService.mode === 'edit'">
          <img :src="VideoImage.textSave" class="img" alt="" />
        </li>
        <li id="pv-bar-next" class="bar-right bar-button" @click="richTextEditPlusService.changeScreen()">
          <span class="img aceButton">
            <el-icon style="width: 24px; height: 24px; position: relative; top: 2px;">
              <FullScreen />
            </el-icon>
          </span>
        </li>
        <li id="pv-bar-next" class="bar-right bar-button" @click="richTextEditPlusService.updateData()"
          v-if="richTextEditPlusService.routerName === 'edit'">
          <span class="img aceButton">
            <el-icon style="width: 24px; height: 24px; position: relative; top: 2px;">
              <RefreshRight />
            </el-icon>
          </span>
        </li>
        <li class="bar-left bar-label">{{ richTextEditPlusService.richTextPath.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VideoImage } from "@/common/pojo/enum/VideoImage";
import { RichTextEditPlusService } from "@/common/service/RichTextEditPlusService";
import { QuillEditor } from '@vueup/vue-quill'
import 'quill1.3.7-table-module/dist/index.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';

export default defineComponent({
  name: "RichTextEditPlus",
  data() {
    return {
      VideoImage: VideoImage,
      richTextEditPlusService: new RichTextEditPlusService(this)
    }
  },
  mounted() {
    this.richTextEditPlusService.initData();
  },
  components: {
    QuillEditor
  }
});
</script>

<style scoped>
:deep(.ql-editor::-webkit-scrollbar-thumb) {
  background-color: #b7b7b7 !important;
  border-radius: 4px !important;
}

:deep(.ql-editor::-webkit-scrollbar) {
  width: 10px !important;
  height: 10px !important;
  background-color: #e5e5e5 !important;
}

.aceButton {
  color: white;
  font-size: 20px;
  font-weight: 900;
}

.video-container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 5;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.video {
  background: white;
  overflow: hidden;
  border-radius: 3px;
  text-align: unset;
  position: relative;
  left: 20px;
  top: 20px;
  z-index: 6;
}

.video-bottombar {
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 5;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1b1b1b;
  height: 48px;
  font-size: 13px;
}

#pv-buttons {
  list-style: none;
  list-style-image: none;
  margin: 0;
  padding: 0;
}

.bar-right {
  float: right;
}

.bar-left {
  float: left;
}

.bar-button {
  transition: all 0.2s ease-in-out;
  display: block;
  line-height: 48px;
  opacity: 0.7;
  cursor: pointer;
}

.bar-label {
  transition: all 0.2s ease-in-out;
  display: block;
  color: #fff;
  height: 48px;
  line-height: 48px;
  padding: 0 12px;
  opacity: 0.7;
}

.img {
  padding: 12px;
}

.img:hover {
  padding: 12px;
  background: #323232;
  color: white;
}
</style>