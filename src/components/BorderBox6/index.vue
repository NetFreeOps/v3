<template>
    <div class="dv-border-box-6" :class="refKey">
      <svg class="dv-border-svg-container" :width="width" :height="height">
        <polygon :fill="backgroundColor" :points="`
          9, 7 ${width - 9}, 7 ${width - 9}, ${height - 7} 9, ${height - 7}
        `" />
  
        <circle :fill="mergedColor[1]" cx="5" cy="5" r="2"/>
        <circle :fill="mergedColor[1]" :cx="width - 5" cy="5" r="2" />
        <circle :fill="mergedColor[1]" :cx="width - 5" :cy="height - 5" r="2" />
        <circle :fill="mergedColor[1]" cx="5" :cy="height - 5" r="2" />
        <polyline :stroke="mergedColor[0]" :points="`10, 4 ${width - 10}, 4`" />
        <polyline :stroke="mergedColor[0]" :points="`10, ${height - 4} ${width - 10}, ${height - 4}`" />
        <polyline :stroke="mergedColor[0]" :points="`5, 70 5, ${height - 70}`" />
        <polyline :stroke="mergedColor[0]" :points="`${width - 5}, 70 ${width - 5}, ${height - 70}`" />
        <polyline :stroke="mergedColor[0]" :points="`3, 10, 3, 50`" />
        <polyline :stroke="mergedColor[0]" :points="`7, 30 7, 80`" />
        <polyline :stroke="mergedColor[0]" :points="`${width - 3}, 10 ${width - 3}, 50`" />
        <polyline :stroke="mergedColor[0]" :points="`${width - 7}, 30 ${width - 7}, 80`" />
        <polyline :stroke="mergedColor[0]" :points="`3, ${height - 10} 3, ${height - 50}`" />
        <polyline :stroke="mergedColor[0]" :points="`7, ${height - 30} 7, ${height - 80}`" />
        <polyline :stroke="mergedColor[0]" :points="`${width - 3}, ${height - 10} ${width - 3}, ${height - 50}`" />
        <polyline :stroke="mergedColor[0]" :points="`${width - 7}, ${height - 30} ${width - 7}, ${height - 80}`" />
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
  const refKey = ref('border-box-6')
  const defaultColor = ref(['rgba(255, 255, 255, 0.35)', 'gray'])
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
  .dv-border-box-6 {
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
        stroke-width: 1;
      }
    }
  
    .border-box-content {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
  </style>