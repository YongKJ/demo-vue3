<template>
  <div v-show="markdownEditPlusService.screen === 'fit' && markdownEditPlusService.visible">
    <div ref="viewerVditor"></div>
  </div>
  <div class="video-container" v-show="markdownEditPlusService.screen === 'full' && markdownEditPlusService.visible">
    <div ref="vditor" class="video" :style="{
      top: markdownEditPlusService.top + 'px',
      left: markdownEditPlusService.left + 'px',
      width: markdownEditPlusService.width + 'px',
      height: markdownEditPlusService.height + 'px',
    }"></div>
    <div class="video-bottombar">
      <ul id="pv-buttons">
        <li id="pv-bar-close" class="bar-right bar-button" @click="markdownEditPlusService.closeMarkdown()">
          <img :src="VideoImage.previewClose" class="img" alt="" />
        </li>
        <li id="pv-bar-raw" class="bar-right bar-button" @click="markdownEditPlusService.saveMdContent(false)"
          v-if="markdownEditPlusService.mode === 'edit'">
          <img :src="VideoImage.textSave" class="img" alt="" />
        </li>
        <li id="pv-bar-next" class="bar-right bar-button" @click="markdownEditPlusService.changeScreen()">
          <span class="img aceButton">
            <el-icon style="width: 24px; height: 24px; position: relative; top: 2px;">
              <FullScreen />
            </el-icon>
          </span>
        </li>
        <li id="pv-bar-next" class="bar-right bar-button" @click="markdownEditPlusService.updateData()"
          v-if="markdownEditPlusService.routerName === 'edit'">
          <span class="img aceButton">
            <el-icon style="width: 24px; height: 24px; position: relative; top: 2px;">
              <RefreshRight />
            </el-icon>
          </span>
        </li>
        <li class="bar-left bar-label">{{ markdownEditPlusService.markdownPath.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import 'vditor/dist/index.css';
import { defineComponent } from "vue";
import { VideoImage } from "@/common/pojo/enum/VideoImage";
import { MarkdownEditPlusService } from "@/common/service/MarkdownEditPlusService";

export default defineComponent({
  name: "MarkdownEditPlus",
  data() {
    return {
      VideoImage: VideoImage,
      markdownEditPlusService: new MarkdownEditPlusService(this)
    }
  },
  mounted() {
    this.markdownEditPlusService.initData().then();
  }
});
</script>

<style scoped>
@import "../assets/css/MarkdownEditPlus.css";

:deep(.hljs::-webkit-scrollbar-thumb) {
  background-color: #b7b7b7;
  border-radius: 4px;
}

:deep(.hljs::-webkit-scrollbar) {
  width: 10px;
  height: 10px;
  border-radius: 4px;
  background-color: #e5e5e5;
}

:deep(.vditor-reset::-webkit-scrollbar-thumb) {
  background-color: #b7b7b7;
  border-radius: 4px;
}

:deep(.vditor-reset::-webkit-scrollbar) {
  width: 10px;
  height: 10px;
  border-radius: 4px;
  background-color: #e5e5e5;
}

:deep(.vditor-emojis button) {
  color: #d1d5da !important;
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
  text-align: unset;
  position: relative;
  left: 20px;
  top: 20px;
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