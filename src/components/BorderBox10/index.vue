<template>
    <div class="dv-border-box-10" :class="refKey" :style="`box-shadow: inset 0 0 25px 3px ${mergedColor[0]}`">
      <svg class="dv-border-svg-container" :width="width" :height="height">
        <polygon :fill="backgroundColor" :points="`
          4, 0 ${width - 4}, 0 ${width}, 4 ${width}, ${height - 4} ${width - 4}, ${height}
          4, ${height} 0, ${height - 4} 0, 4
        `" />
      </svg>
  
      <svg
        width="150px"
        height="150px"
        :key="item"
        v-for="item in border"
        :class="`${item} dv-border-svg-container`"
      >
        <polygon
          :fill="mergedColor[1]"
          points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3"
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
  const refKey = ref('border-box-10')
  const border = ref(['left-top', 'right-top', 'left-bottom', 'right-bottom'])
  const defaultColor = ref(['#1d48c4', '#d3e1f8'])
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
  .dv-border-box-10 {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 6px;
  
    .dv-border-svg-container {
      position: absolute;
      display: block;
    }
  
    .right-top {
      right: 0px;
      transform: rotateY(180deg);
    }
  
    .left-bottom {
      bottom: 0px;
      transform: rotateX(180deg);
    }
  
    .right-bottom {
      right: 0px;
      bottom: 0px;
      transform: rotateX(180deg) rotateY(180deg);
    }
  
    .border-box-content {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
  </style>