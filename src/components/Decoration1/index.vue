<template>
  <div class="dv-decoration-1" :class="refKey">
    <svg 
      :width="`${svgWH[0]}px`" 
      :height="`${svgWH[1]}px`" 
      :style="`transform:scale(${svgScale[0]},${svgScale[1]});`"
      viewBox="0 0 200 50"
      preserveAspectRatio="xMidYMid meet"
      style="min-width: 0; flex-shrink: 0;"
    >
      <template v-for="(point, i) in points" :key="i">
        <rect
          v-if="Math.random() > 0.6"
          :fill="mergedColor[0]"
          :x="point[0] - halfPointSideLength"
          :y="point[1] - halfPointSideLength"
          :width="pointSideLength"
          :height="pointSideLength"
        >
          <animate
            v-if="Math.random() > 0.6"
            attributeName="fill"
            :values="`${mergedColor[0]};transparent`"
            dur="1s"
            :begin="Math.random() * 2"
            repeatCount="indefinite"
          />
        </rect>
      </template>

      <rect
        v-if="rects[0]"
        :fill="mergedColor[1]"
        :x="rects[0][0] - pointSideLength"
        :y="rects[0][1] - pointSideLength"
        :width="pointSideLength * 2"
        :height="pointSideLength * 2"
      >
        <animate
          attributeName="width"
          :values="`0;${pointSideLength * 2}`"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          :values="`0;${pointSideLength * 2}`"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x"
          :values="`${rects[0][0]};${rects[0][0] - pointSideLength}`"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          :values="`${rects[0][1]};${rects[0][1] - pointSideLength}`"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>

      <rect
        v-if="rects[1]"
        :fill="mergedColor[1]"
        :x="rects[1][0] - 40"
        :y="rects[1][1] - pointSideLength"
        :width="40"
        :height="pointSideLength * 2"
      >
        <animate
          attributeName="width"
          values="0;40;0"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x"
          :values="`${rects[1][0]};${rects[1][0] - 40};${rects[1][0]}`"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useAutoResize } from '../../utils/autosize'
import { deepMerge, deepClone } from '../../utils/index'

// Props定义
const props = defineProps({
  color: {
    type: Array,
    default: () => []
  }
})

// 响应式数据
const refKey = ref('decoration-1')
const defaultColor = ref(['#fff', '#0de7c2'])
const mergedColor = ref([])

const pointSideLength = 2.5
const halfPointSideLength = pointSideLength / 2

const svgWH = ref([200, 50])
const svgScale = ref([1, 1])
const rowNum = 4
const rowPoints = 20
const points = ref([])
const rects = ref([])

// 使用autoResize composable
const { width, height } = useAutoResize(refKey)

// 方法
const calcPointsPosition = () => {
  const [w, h] = svgWH.value
  const horizontalGap = w / (rowPoints + 1)
  const verticalGap = h / (rowNum + 1)

  // 修复: 直接赋值给 points.value
  points.value = new Array(rowNum).fill(0).map((foo, i) =>
    new Array(rowPoints).fill(0).map((foo, j) => [
      horizontalGap * (j + 1),
      verticalGap * (i + 1)
    ])
  ).reduce((all, item) => [...all, ...item], [])
}

const calcRectsPosition = () => {
  if (!points.value.length) return
  const rect1 = points.value[rowPoints * 2 - 1]
  const rect2 = points.value[rowPoints * 2 - 3]
  rects.value = [rect1, rect2]
}

const calcScale = () => {
  const [w, h] = svgWH.value
  svgScale.value = [width.value / w, height.value / h]
}

const calcSVGData = () => {
  calcPointsPosition()
  calcRectsPosition()
  calcScale()
}

const mergeColor = () => {
  mergedColor.value = deepMerge(deepClone(defaultColor.value), props.color || [])
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
.dv-decoration-1 {
  width: 100%;
  height: 100%;

  svg {
    transform-origin: left top;
  }
}
</style>