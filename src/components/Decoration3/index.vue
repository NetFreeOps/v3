<template>
    <div class="dv-decoration-3" :class="refKey">
      <svg :width="`${svgWH[0]}px`" :height="`${svgWH[1]}px`" :style="`transform:scale(${svgScale[0]},${svgScale[1]});`">
        <template v-for="(point, i) in points" :key="i">
          <rect
            :fill="mergedColor[0]"
            :x="point[0] - halfPointSideLength"
            :y="point[1] - halfPointSideLength"
            :width="pointSideLength"
            :height="pointSideLength"
          >
            <animate
              v-if="Math.random() > 0.6"
              attributeName="fill"
              :values="`${mergedColor.join(';')}`"
              :dur="Math.random() + 1 + 's'"
              :begin="Math.random() * 2"
              repeatCount="indefinite"
            />
          </rect>
        </template>
      </svg>
    </div>
  </template>
  <!--  -->
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
    }
  })
  
  // 响应式数据
  const refKey = ref('decoration-3')
  const defaultColor = ref(['#7acaec', 'transparent'])
  const mergedColor = ref([])
  
  const svgWH = ref([300, 35])
  const svgScale = ref([1, 1])
  const rowNum = 2
  const rowPoints = 25
  
  const pointSideLength = 7
  const halfPointSideLength = pointSideLength / 2
  const points = ref([])
  
  // 使用autoResize composable
  const { width, height } = useAutoResize(refKey)
  
  // 方法
  const calcPointsPosition = () => {
    const [w, h] = svgWH.value
  
    const horizontalGap = w / (rowPoints + 1)
    const verticalGap = h / (rowNum + 1)
  
    let newPoints = new Array(rowNum).fill(0).map((foo, i) =>
      new Array(rowPoints).fill(0).map((foo, j) => [
        horizontalGap * (j + 1),
        verticalGap * (i + 1)
      ]))
  
    points.value = newPoints.reduce((all, item) => [...all, ...item], [])
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
  .dv-decoration-3 {
    width: 100%;
    height: 100%;
  
    svg {
      transform-origin: left top;
    }
  }
  </style>