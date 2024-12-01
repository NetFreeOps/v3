<template>
    <div class="dv-decoration-10" :class="refKey">
      <svg :width="width" :height="height">
        <polyline
          :stroke="mergedColor[1]"
          stroke-width="2"
          :points="`0, ${height / 2} ${width}, ${height / 2}`"
        />
  
        <polyline
          :stroke="mergedColor[0]"
          stroke-width="2"
          :points="`5, ${height / 2} ${width * 0.2 - 3}, ${height / 2}`"
          :stroke-dasharray="`0, ${width * 0.2}`"
          fill="freeze"
        >
          <animate
            :id="animationId2"
            attributeName="stroke-dasharray"
            :values="`0, ${width * 0.2};${width * 0.2}, 0;`"
            dur="3s"
            :begin="`${animationId1}.end`"
            fill="freeze"
          />
          <animate
            attributeName="stroke-dasharray"
            :values="`${width * 0.2}, 0;0, ${width * 0.2}`"
            dur="0.01s"
            :begin="`${animationId7}.end`"
            fill="freeze"
          />
        </polyline>
  
        <polyline
          :stroke="mergedColor[0]"
          stroke-width="2"
          :points="`${width * 0.2 + 3}, ${height / 2} ${width * 0.8 - 3}, ${height / 2}`"
          :stroke-dasharray="`0, ${width * 0.6}`"
        >
          <animate
            :id="animationId4"
            attributeName="stroke-dasharray"
            :values="`0, ${width * 0.6};${width * 0.6}, 0`"
            dur="3s"
            :begin="`${animationId3}.end + 1s`"
            fill="freeze"
          />
          <animate
            attributeName="stroke-dasharray"
            :values="`${width * 0.6}, 0;0, ${width * 0.6}`"
            dur="0.01s"
            :begin="`${animationId7}.end`"
            fill="freeze"
          />
        </polyline>
  
        <polyline
          :stroke="mergedColor[0]"
          stroke-width="2"
          :points="`${width * 0.8 + 3}, ${height / 2} ${width - 5}, ${height / 2}`"
          :stroke-dasharray="`0, ${width * 0.2}`"
        >
          <animate
            :id="animationId6"
            attributeName="stroke-dasharray"
            :values="`0, ${width * 0.2};${width * 0.2}, 0`"
            dur="3s"
            :begin="`${animationId5}.end + 1s`"
            fill="freeze"
          />
          <animate
            attributeName="stroke-dasharray"
            :values="`${width * 0.2}, 0;0, ${width * 0.3}`"
            dur="0.01s"
            :begin="`${animationId7}.end`"
            fill="freeze"
          />
        </polyline>
  
        <circle cx="2" :cy="height / 2" r="2" :fill="mergedColor[1]">
          <animate
            :id="animationId1"
            attributeName="fill"
            :values="`${mergedColor[1]};${mergedColor[0]}`"
            :begin="`0s;${animationId7}.end`"
            dur="0.3s"
            fill="freeze"
          />
        </circle>
  
        <circle :cx="width * 0.2" :cy="height / 2" r="2" :fill="mergedColor[1]">
          <animate
            :id="animationId3"
            attributeName="fill"
            :values="`${mergedColor[1]};${mergedColor[0]}`"
            :begin="`${animationId2}.end`"
            dur="0.3s"
            fill="freeze"
          />
          <animate
            attributeName="fill"
            :values="`${mergedColor[1]};${mergedColor[1]}`"
            dur="0.01s"
            :begin="`${animationId7}.end`"
            fill="freeze"
          />
        </circle>
  
        <circle :cx="width * 0.8" :cy="height / 2" r="2" :fill="mergedColor[1]">
          <animate
            :id="animationId5"
            attributeName="fill"
            :values="`${mergedColor[1]};${mergedColor[0]}`"
            :begin="`${animationId4}.end`"
            dur="0.3s"
            fill="freeze"
          />
          <animate
            attributeName="fill"
            :values="`${mergedColor[1]};${mergedColor[1]}`"
            dur="0.01s"
            :begin="`${animationId7}.end`"
            fill="freeze"
          />
        </circle>
  
        <circle :cx="width - 2" :cy="height / 2" r="2" :fill="mergedColor[1]">
          <animate
            :id="animationId7"
            attributeName="fill"
            :values="`${mergedColor[1]};${mergedColor[0]}`"
            :begin="`${animationId6}.end`"
            dur="0.3s"
            fill="freeze"
          />
          <animate
            attributeName="fill"
            :values="`${mergedColor[1]};${mergedColor[1]}`"
            dur="0.01s"
            :begin="`${animationId7}.end`"
            fill="freeze"
          />
        </circle>
      </svg>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import { useAutoResize } from '../../utils/autosize'
  import { uuid } from '../../utils/index'
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
  const refKey = ref('decoration-10')
  const defaultColor = ref(['#00c2ff', 'rgba(0, 194, 255, 0.3)'])
  const mergedColor = ref([])
  
  const id = uuid()
  const animationId1 = ref(`d10ani1${id}`)
  const animationId2 = ref(`d10ani2${id}`)
  const animationId3 = ref(`d10ani3${id}`)
  const animationId4 = ref(`d10ani4${id}`)
  const animationId5 = ref(`d10ani5${id}`)
  const animationId6 = ref(`d10ani6${id}`)
  const animationId7 = ref(`d10ani7${id}`)
  
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
  .dv-decoration-10 {
    width: 100%;
    height: 100%;
    display: flex;
  }
  </style>