<template>
    <div class="dv-decoration-8" :class="refKey">
      <svg :width="width" :height="height">
        <polyline
          :stroke="mergedColor[0]"
          stroke-width="2"
          fill="transparent"
          :points="`${xPos(0)}, 0 ${xPos(30)}, ${height / 2}`"
        />
  
        <polyline
          :stroke="mergedColor[0]"
          stroke-width="2"
          fill="transparent"
          :points="`${xPos(20)}, 0 ${xPos(50)}, ${height / 2} ${xPos(width)}, ${height / 2}`"
        />
  
        <polyline
          :stroke="mergedColor[1]"
          fill="transparent"
          stroke-width="3"
          :points="`${xPos(0)}, ${height - 3}, ${xPos(200)}, ${height - 3}`"
        />
      </svg>
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
    }
  })
  
  // 响应式数据
  const refKey = ref('decoration-8')
  const defaultColor = ref(['#3f96a5', '#3f96a5'])
  const mergedColor = ref([])
  
  // 使用autoResize composable
  const { width, height } = useAutoResize(refKey)
  
  // 方法
  const xPos = (pos) => {
    if (!props.reverse) return pos
    return width.value - pos
  }
  
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
  .dv-decoration-8 {
    display: flex;
    width: 100%;
    height: 100%;
  }
  </style>