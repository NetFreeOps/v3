<template>
    <div class="dv-border-box-2" :ref="refKey">
      <svg class="dv-border-svg-container" :width="width" :height="height">
        <polygon :fill="backgroundColor" :points="`
          7, 7 ${width - 7}, 7 ${width - 7}, ${height - 7} 7, ${height - 7}
        `" />
  
        <polyline
          :stroke="mergedColor[0]"
          :points="`2, 2 ${width - 2} ,2 ${width - 2}, ${height - 2} 2, ${height - 2} 2, 2`"
        />
        <polyline
          :stroke="mergedColor[1]"
          :points="`6, 6 ${width - 6}, 6 ${width - 6}, ${height - 6} 6, ${height - 6} 6, 6`"
        />
        <circle :fill="mergedColor[0]" cx="11" cy="11" r="1" />
        <circle :fill="mergedColor[0]" :cx="width - 11" cy="11" r="1" />
        <circle :fill="mergedColor[0]" :cx="width - 11" :cy="height - 11" r="1" />
        <circle :fill="mergedColor[0]" cx="11" :cy="height - 11" r="1" />
      </svg>
  
      <div class="border-box-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import { useAutoResize } from '../../utils/autosize' // 假设mixin被转换为composable
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
  const refKey = ref('border-box-2')
  const defaultColor = ref(['#fff', 'rgba(255, 255, 255, 0.6)'])
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
  .dv-border-box-2 {
    position: relative;
    width: 100%;
    height: 100%;
  
    .dv-border-svg-container {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
  
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