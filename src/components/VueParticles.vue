<template>
  <div
      id="particles-js"
      :color="color"
      :particleOpacity="particleOpacity"
      :linesColor="linesColor"
      :particlesNumber="particlesNumber"
      :shapeType="shapeType"
      :particleSize="particleSize"
      :linesWidth="linesWidth"
      :lineLinked="lineLinked"
      :lineOpacity="lineOpacity"
      :linesDistance="linesDistance"
      :moveSpeed="moveSpeed"
      :moveDirection="moveDirection"
      :hoverEffect="hoverEffect"
      :hoverMode="hoverMode"
      :clickEffect="clickEffect"
      :clickMode="clickMode"
  ></div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {VueParticlesService} from "@/common/service/VueParticlesService";

export default defineComponent({
  name: 'VueParticles',
  data() {
    return {
      vueParticlesService: new VueParticlesService(this)
    }
  },
  mounted() {
    this.vueParticlesService.initData();
  },
  props: {
    color: {
      type: String,
      default: '#dedede'
    },
    particleOpacity: {
      type: Number,
      default: 0.7
    },
    particlesNumber: {
      type: Number,
      default: 80
    },
    shapeType: {
      type: String,
      default: 'circle'
    },
    particleSize: {
      type: Number,
      default: 4
    },
    linesColor: {
      type: String,
      default: '#dedede'
    },
    linesWidth: {
      type: Number,
      default: 1
    },
    lineLinked: {
      type: Boolean,
      default: true
    },
    lineOpacity: {
      type: Number,
      default: 0.4
    },
    linesDistance: {
      type: Number,
      default: 150
    },
    moveSpeed: {
      type: Number,
      default: 3
    },
    moveDirection: {
      type: String,
      default: 'none'
    },
    hoverEffect: {
      type: Boolean,
      default: true
    },
    hoverMode: {
      type: String,
      default: 'grab'
    },
    clickEffect: {
      type: Boolean,
      default: true
    },
    clickMode: {
      type: String,
      default: 'push'
    }
  },
});
</script>
