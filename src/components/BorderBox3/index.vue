<template>
    <div class="dv-border-box-3" :class="refKey">
      <svg class="dv-border-svg-container" :width="width" :height="height">
        <polygon :fill="backgroundColor" :points="`
          23, 23 ${width - 24}, 23 ${width - 24}, ${height - 24} 23, ${height - 24}
        `" />
  
        <polyline class="dv-bb3-line1"
          :stroke="mergedColor[0]"
          :points="`4, 4 ${width - 22} ,4 ${width - 22}, ${height - 22} 4, ${height - 22} 4, 4`"
        />
        <polyline class="dv-bb3-line2"
          :stroke="mergedColor[1]"
          :points="`10, 10 ${width - 16}, 10 ${width - 16}, ${height - 16} 10, ${height - 16} 10, 10`"
        />
        <polyline class="dv-bb3-line2"
          :stroke="mergedColor[1]"
          :points="`16, 16 ${width - 10}, 16 ${width - 10}, ${height - 10} 16, ${height - 10} 16, 16`"
        />
        <polyline class="dv-bb3-line2"
          :stroke="mergedColor[1]"
          :points="`22, 22 ${width - 4}, 22 ${width - 4}, ${height - 4} 22, ${height - 4} 22, 22`"
        />
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
  const refKey = ref('border-box-3')
  const defaultColor = ref(['#2862b7', '#2862b7'])
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
  .dv-border-box-3 {
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
      }
    }
  
    .dv-bb3-line1 {
      stroke-width: 3;
    }
  
    .dv-bb3-line2 {
      stroke-width: 1;
    }
  
    .border-box-content {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
  </style>