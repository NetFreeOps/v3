<template>
    <div class="dv-border-box-13" :class="refKey">
      <svg class="dv-border-svg-container" :width="width" :height="height">
        <path
          :fill="backgroundColor"
          :stroke="mergedColor[0]"
          :d="`
            M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
            L ${width - 20} 10 L ${width - 5} 25
            L ${width - 5} ${height - 5} L 20 ${height - 5}
            L 5 ${height - 20} L 5 20
          `"
        />
  
        <path
          fill="transparent"
          stroke-width="3"
          stroke-linecap="round"
          stroke-dasharray="10, 5"
          :stroke="mergedColor[0]"
          :d="`M 16 9 L 61 9`"
        />
  
        <path
          fill="transparent"
          :stroke="mergedColor[1]"
          :d="`M 5 20 L 5 10 L 12 3  L 60 3 L 68 10`"
        />
  
        <path
          fill="transparent"
          :stroke="mergedColor[1]"
          :d="`M ${width - 5} ${height - 30} L ${width - 5} ${height - 5} L ${width - 30} ${height - 5}`"
        />
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
  const refKey = ref('border-box-13')
  const defaultColor = ref(['#6586ec', '#2cf7fe'])
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
  .dv-border-box-13 {
    position: relative;
    width: 100%;
    height: 100%;
  
    .dv-border-svg-container {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
    }
  
    .border-box-content {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
  </style>