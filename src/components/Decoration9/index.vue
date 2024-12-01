<template>
    <div class="dv-decoration-9" :class="refKey">
      <svg :width="`${svgWH[0]}px`" :height="`${svgWH[1]}px`" :style="`transform:scale(${svgScale[0]},${svgScale[1]});`">
        <defs>
          <polygon :id="polygonId" points="15, 46.5, 21, 47.5, 21, 52.5, 15, 53.5" />
        </defs>
  
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          :stroke="mergedColor[1]"
          stroke-width="10"
          stroke-dasharray="80, 100, 30, 100"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50;360 50 50"
            :dur="`${dur}s`"
            repeatCount="indefinite"
          />
        </circle>
  
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          :stroke="mergedColor[0]"
          stroke-width="6"
          stroke-dasharray="50, 66, 100, 66"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50;-360 50 50"
            :dur="`${dur}s`"
            repeatCount="indefinite"
          />
        </circle>
  
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="transparent"
          :stroke="fade(mergedColor[1] || defaultColor[1], 30)"
          stroke-width="1"
          stroke-dasharray="5, 1"
        />
  
        <use
          v-for="(foo, i) in new Array(20).fill(0)"
          :key="i"
          :xlink:href="`#${polygonId}`"
          :stroke="mergedColor[1]"
          :fill="Math.random() > 0.4 ? 'transparent' : mergedColor[0]"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50;360 50 50"
            :dur="`${dur}s`"
            :begin="`${i * dur / 20}s`"
            repeatCount="indefinite"
          />
        </use>
  
        <circle
          cx="50"
          cy="50"
          r="26"
          fill="transparent"
          :stroke="fade(mergedColor[1] || defaultColor[1], 30)"
          stroke-width="1"
          stroke-dasharray="5, 1"
        />
      </svg>
  
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import { useAutoResize } from '../../utils/autosize'
  import { uuid } from '../../utils/index'
  import { deepMerge } from '../../utils/index'
  import { deepClone } from '../../utils/index'
  import { fade } from '../../utils/color'
  
  // Props定义
  const props = defineProps({
    color: {
      type: Array,
      default: () => []
    },
    dur: {
      type: Number,
      default: 3
    }
  })
  
  // 响应式数据
  const refKey = ref('decoration-9')
  const defaultColor = ref(['rgba(3, 166, 224, 0.8)', 'rgba(3, 166, 224, 0.5)'])
  const mergedColor = ref([])
  
  const svgWH = ref([100, 100])
  const svgScale = ref([1, 1])
  
  const id = uuid()
  const polygonId = ref(`decoration-9-polygon-${id}`)
  
  // 使用autoResize composable
  const { width, height } = useAutoResize(refKey)
  
  // 方法
  const calcScale = () => {
    const [w, h] = svgWH.value
    svgScale.value = [width.value / w, height.value / h]
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
    calcScale()
  })
  
  // 监听尺寸变化
  watch([width, height], () => {
    calcScale()
  })
  </script>
  
  <style lang="less">
  .dv-decoration-9 {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  
    svg {
      position: absolute;
      left: 0px;
      top: 0px;
      transform-origin: left top;
    }
  }
  </style>