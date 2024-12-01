<template>
    <div class="dv-decoration-6" :class="refKey">
      <svg :width="`${svgWH[0]}px`" :height="`${svgWH[1]}px`" :style="`transform:scale(${svgScale[0]},${svgScale[1]});`">
        <template v-for="(point, i) in points" :key="i">
          <rect
            :fill="mergedColor[Math.random() > 0.5 ? 0 : 1]"
            :x="point[0] - halfRectWidth"
            :y="point[1] - heights[i] / 2"
            :width="rectWidth"
            :height="heights[i]"
          >
            <animate
              attributeName="y"
              :values="`${point[1] - minHeights[i] / 2};${point[1] - heights[i] / 2};${point[1] - minHeights[i] / 2}`"
              :dur="`${randoms[i]}s`"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
              begin="0s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="height"
              :values="`${minHeights[i]};${heights[i]};${minHeights[i]}`"
              :dur="`${randoms[i]}s`"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
              begin="0s"
              repeatCount="indefinite"
            />
          </rect>
        </template>
      </svg>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import { useAutoResize } from '../../utils/autosize'
  import { deepMerge } from '../../utils/index'
  import { deepClone } from '../../utils/index'
  import { randomExtend } from '../../utils/index'
  
  // Props定义
  const props = defineProps({
    color: {
      type: Array,
      default: () => []
    }
  })
  
  // 响应式数据
  const refKey = ref('decoration-6')
  const defaultColor = ref(['#7acaec', '#7acaec'])
  const mergedColor = ref([])
  
  const svgWH = ref([300, 35])
  const svgScale = ref([1, 1])
  const rowNum = 1
  const rowPoints = 40
  
  const rectWidth = 7
  const halfRectWidth = rectWidth / 2
  
  const points = ref([])
  const heights = ref([])
  const minHeights = ref([])
  const randoms = ref([])
  
  // 使用autoResize composable
  const { width, height } = useAutoResize(refKey)
  
  // 方法
  const calcPointsPosition = () => {
    const [w, h] = svgWH.value
  
    const horizontalGap = w / (rowPoints + 1)
    const verticalGap = h / (rowNum + 1)
  
    let points = new Array(rowNum).fill(0).map((foo, i) =>
      new Array(rowPoints).fill(0).map((foo, j) => [
        horizontalGap * (j + 1),
        verticalGap * (i + 1)
      ]))
  
    points.value = points.reduce((all, item) => [...all, ...item], [])
  
    const heights = new Array(rowNum * rowPoints)
      .fill(0)
      .map(foo => Math.random() > 0.8 
        ? randomExtend(0.7 * h, h) 
        : randomExtend(0.2 * h, 0.5 * h))
  
    heights.value = heights
    minHeights.value = new Array(rowNum * rowPoints)
      .fill(0)
      .map((foo, i) => heights[i] * Math.random())
  
    randoms.value = new Array(rowNum * rowPoints)
      .fill(0)
      .map(foo => Math.random() + 1.5)
  }
  
  const calcScale = () => {
    const [w, h] = svgWH.value
    svgScale.value = [width.value / w, height.value / h]
  }
  
  const calcSVGData = () => {
    calcPointsPosition()
    calcScale()
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
    calcSVGData()
  })
  
  // 监听尺寸变化
  watch([width, height], () => {
    calcSVGData()
  })
  </script>
  
  <style lang="less">
  .dv-decoration-6 {
    width: 100%;
    height: 100%;
  
    svg {
      transform-origin: left top;
    }
  }
  </style>