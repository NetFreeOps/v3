<template>
  <div class="dv-decoration-5" :class="refKey">
    <svg 
      :width="width" 
      :height="height"
     
      preserveAspectRatio="xMidYMid meet"
    >
      <polyline
        fill="transparent"
        :stroke="mergedColor[0]"
        stroke-width="3"
        :points="line1Points"
      >
        <animate
          attributeName="stroke-dasharray"
          attributeType="XML"
          :from="`0, ${line1Length / 2}, 0, ${line1Length / 2}`"
          :to="`0, 0, ${line1Length}, 0`"
          :dur="`${dur}s`"
          begin="0s"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.4,1,0.49,0.98"
          repeatCount="indefinite"
        />
      </polyline>

      <polyline
        fill="transparent"
        :stroke="mergedColor[1]"
        stroke-width="2"
        :points="line2Points"
      >
        <animate
          attributeName="stroke-dasharray"
          attributeType="XML"
          :from="`0, ${line2Length / 2}, 0, ${line2Length / 2}`"
          :to="`0, 0, ${line2Length}, 0`"
          :dur="`${dur}s`"
          begin="0s"
          calcMode="spline"
          keyTimes="0;1"
          keySplines=".4,1,.49,.98"
          repeatCount="indefinite"
        />
      </polyline>
    </svg>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useAutoResize } from '../../utils/autosize'
import { getPolylineLength, deepMerge, deepClone } from '../../utils/index'

// Props定义
const props = defineProps({
  color: {
    type: Array,
    default: () => []
  },
  dur: {
    type: Number,
    default: 1.2
  }
})

// 响应式数据
const refKey = ref('decoration-5')
const defaultColor = ref(['#3f96a5', '#3f96a5'])
const mergedColor = ref([])

const line1Points = ref('')
const line2Points = ref('')
const line1Length = ref(0)
const line2Length = ref(0)

// 使用autoResize composable
const { width, height } = useAutoResize(refKey)

// 方法
const calcSVGData = () => {
  if (!width.value || !height.value) return
  
  const points1 = [
    [0, height.value * 0.2],
    [width.value * 0.18, height.value * 0.2],
    [width.value * 0.2, height.value * 0.4],
    [width.value * 0.25, height.value * 0.4],
    [width.value * 0.27, height.value * 0.6],
    [width.value * 0.72, height.value * 0.6],
    [width.value * 0.75, height.value * 0.4],
    [width.value * 0.8, height.value * 0.4],
    [width.value * 0.82, height.value * 0.2],
    [width.value, height.value * 0.2]
  ]

  const points2 = [
    [width.value * 0.3, height.value * 0.8],
    [width.value * 0.7, height.value * 0.8]
  ]

  line1Length.value = getPolylineLength(points1)
  line2Length.value = getPolylineLength(points2)

  line1Points.value = points1.map(point => point.join(',')).join(' ')
  line2Points.value = points2.map(point => point.join(',')).join(' ')
}

const mergeColor = () => {
  mergedColor.value = deepMerge(deepClone(defaultColor.value), props.color || [])
}

// 监听
watch(() => props.color, () => {
  mergeColor()
}, { deep: true })

// 生命周期钩子
onMounted(() => {
  mergeColor()
  calcSVGData()
})

// 监听尺寸变化
watch([width, height], () => {
  calcSVGData()
}, { immediate: true })
</script>

<style lang="less">
.dv-decoration-5 {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  svg {
    min-width: 0;
    max-width: 100%;
    height: auto;
  }
}
</style>