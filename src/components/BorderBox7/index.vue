<template>
    <div
      class="dv-border-box-7"
      :class="refKey"
      :style="`box-shadow: inset 0 0 40px ${mergedColor[0]}; border: 1px solid ${mergedColor[0]}; background-color: ${backgroundColor}`"
    >
      <svg class="dv-border-svg-container" :width="width" :height="height">
        <polyline class="dv-bb7-line-width-2" :stroke="mergedColor[0]" :points="`0, 25 0, 0 25, 0`" />
        <polyline class="dv-bb7-line-width-2" :stroke="mergedColor[0]" :points="`${width - 25}, 0 ${width}, 0 ${width}, 25`" />
        <polyline class="dv-bb7-line-width-2" :stroke="mergedColor[0]" :points="`${width - 25}, ${height} ${width}, ${height} ${width}, ${height - 25}`" />
        <polyline class="dv-bb7-line-width-2" :stroke="mergedColor[0]" :points="`0, ${height - 25} 0, ${height} 25, ${height}`" />
  
        <polyline class="dv-bb7-line-width-5" :stroke="mergedColor[1]" :points="`0, 10 0, 0 10, 0`" />
        <polyline class="dv-bb7-line-width-5" :stroke="mergedColor[1]" :points="`${width - 10}, 0 ${width}, 0 ${width}, 10`" />
        <polyline class="dv-bb7-line-width-5" :stroke="mergedColor[1]" :points="`${width - 10}, ${height} ${width}, ${height} ${width}, ${height - 10}`" />
        <polyline class="dv-bb7-line-width-5" :stroke="mergedColor[1]" :points="`0, ${height - 10} 0, ${height} 10, ${height}`" />
      </svg>
  
      <div class="border-box-content">
        <slot></slot>
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
    backgroundColor: {
      type: String,
      default: 'transparent'
    }
  })
  
  // 响应式数据
  const refKey = ref('border-box-7')
  const defaultColor = ref(['rgba(128,128,128,0.3)', 'rgba(128,128,128,0.5)'])
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
  .dv-border-box-7 {
    position: relative;
    width: 100%;
    height: 100%;
  
    .dv-border-svg-container {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
  
      & > polyline {
        fill: none;
        stroke-linecap: round;
      }
    }
  
    .dv-bb7-line-width-2 {
      stroke-width: 2;
    }
  
    .dv-bb7-line-width-5 {
      stroke-width: 5;
    }
  
    .border-box-content {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
  </style>