<template>
    <div class="dv-decoration-2" :class="refKey">
      <svg :width="`${width}px`" :height="`${height}px`">
        <rect :x="x" :y="y" :width="w" :height="h" :fill="mergedColor[0]">
          <animate
            :attributeName="reverse ? 'height' : 'width'"
            from="0"
            :to="reverse ? height : width"
            :dur="`${dur}s`"
            calcMode="spline"
            keyTimes="0;1"
            keySplines=".42,0,.58,1"
            repeatCount="indefinite"
          />
        </rect>
  
        <rect :x="x" :y="y" width="1" height="1" :fill="mergedColor[1]">
          <animate
            :attributeName="reverse ? 'y' : 'x'"
            from="0"
            :to="reverse ? height : width"
            :dur="`${dur}s`"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.42,0,0.58,1"
            repeatCount="indefinite"
          />
        </rect>
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
    },
    dur: {
      type: Number,
      default: 6
    }
  })
  
  // 响应式数据
  const refKey = ref('decoration-2')
  const defaultColor = ref(['#3faacb', '#fff'])
  const mergedColor = ref([])
  
  const x = ref(0)
  const y = ref(0)
  const w = ref(0)
  const h = ref(0)
  
  // 使用autoResize composable
  const { width, height } = useAutoResize(refKey)
  
  // 方法
  const calcSVGData = () => {
    if (props.reverse) {
      w.value = 1
      h.value = height.value
      x.value = width.value / 2
      y.value = 0
    } else {
      w.value = width.value
      h.value = 1
      x.value = 0
      y.value = height.value / 2
    }
  }
  
  const mergeColor = () => {
    mergedColor.value = deepMerge(deepClone(defaultColor.value, true), props.color || [])
  }
  
  // 监听
  watch(() => props.color, () => {
    mergeColor()
  })
  
  watch(() => props.reverse, () => {
    calcSVGData()
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
  .dv-decoration-2 {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  </style>