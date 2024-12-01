<template>
    <div class="dv-decoration-4" :class="refKey">
      <div
        :class="`container ${reverse ? 'reverse' : 'normal'}`"
        :style="reverse ? `width:${width}px;height:5px;animation-duration:${dur}s` : `width:5px;height:${height}px;animation-duration:${dur}s`"
      >
        <svg :width="reverse ? width : 5" :height="reverse ? 5 : height">
          <polyline
            :stroke="mergedColor[0]"
            :points="reverse ? `0, 2.5 ${width}, 2.5` : `2.5, 0 2.5, ${height}`"
          />
          <polyline
            class="bold-line"
            :stroke="mergedColor[1]"
            stroke-width="3"
            stroke-dasharray="20, 80"
            stroke-dashoffset="-30"
            :points="reverse ? `0, 2.5 ${width}, 2.5` : `2.5, 0 2.5, ${height}`"
          />
        </svg>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import { useAutoResize } from '../../utils/autosize'
  import { deepMerge } from '../../utils/index'
  import { deepClone } from '../../utils/index'
  
  // Props定义
  const props = defineProps({
    color: {
      type: Array,
      default: () => []
    },
    reverse: {
      type: Boolean,
      default: false
    },
    dur: {
      type: Number,
      default: 3
    }
  })
  
  // 响应式数据
  const refKey = ref('decoration-4')
  const defaultColor = ref(['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.3)'])
  const mergedColor = ref([])
  
  // 使用autoResize composable
  const { width, height } = useAutoResize(refKey)
  
  // 方法
  const mergeColor = () => {
    mergedColor.value = deepMerge(deepClone(defaultColor.value, true), props.color || [])
  }
  
  // 监听
  watch(() => props.color, () => {
    mergeColor()
  })
  
  // 生命周期钩子
  onMounted(() => {
    mergeColor()
  })
  </script>
  
  <style lang="less">
  .dv-decoration-4 {
    position: relative;
    width: 100%;
    height: 100%;
  
    .container {
      display: flex;
      overflow: hidden;
      position: absolute;
      flex: 1;
    }
  
    .normal {
      animation: ani-height ease-in-out infinite;
      left: 50%;
      margin-left: -2px;
    }
  
    .reverse {
      animation: ani-width ease-in-out infinite;
      top: 50%;
      margin-top: -2px;
    }
  
    @keyframes ani-height {
      0% {
        height: 0%;
      }
  
      70% {
        height: 100%;
      }
  
      100% {
        height: 100%;
      }
    }
  
    @keyframes ani-width {
      0% {
        width: 0%;
      }
      
      70% {
        width: 100%;
      }
  
      100% {
        width: 100%;
      }
    }
  }
  </style>