<template>
    <div class="dv-border-box-8" :class="refKey">
      <svg class="dv-border-svg-container" :width="width" :height="height">
        <defs>
          <path
            :id="path"
            :d="pathD"
            fill="transparent"
          />
          <radialGradient
            :id="gradient"
            cx="50%" cy="50%" r="50%"
          >
            <stop
              offset="0%" stop-color="#fff"
              stop-opacity="1"
            />
            <stop
              offset="100%" stop-color="#fff"
              stop-opacity="0"
            />
          </radialGradient>
  
          <mask :id="mask">
            <circle cx="0" cy="0" r="150" :fill="`url(#${gradient})`">
              <animateMotion
                :dur="`${dur}s`"
                :path="pathD"
                rotate="auto"
                repeatCount="indefinite"
              />
            </circle>
          </mask>
        </defs>
  
        <polygon :fill="backgroundColor" :points="`5, 5 ${width - 5}, 5 ${width - 5} ${height - 5} 5, ${height - 5}`" />
  
        <use
          :stroke="mergedColor[0]"
          stroke-width="1"
          :xlink:href="`#${path}`"
        />
  
        <use
          :stroke="mergedColor[1]"
          stroke-width="3"
          :xlink:href="`#${path}`"
          :mask="`url(#${mask})`"
        >
          <animate
            attributeName="stroke-dasharray"
            :from="`0, ${length}`"
            :to="`${length}, 0`"
            :dur="`${dur}s`"
            repeatCount="indefinite"
          />
        </use>
      </svg>
  
      <div class="border-box-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useAutoResize } from '../../utils/autosize'
  import { uuid } from '../../utils/index'
  import { deepMerge } from '../../utils/index'
  import { deepClone } from '../../utils/index'
  
  // Props定义
  const props = defineProps({
    color: {
      type: Array,
      default: () => []
    },
    dur: {
      type: Number,
      default: 3
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    reverse: {
      type: Boolean,
      default: false
    }
  })
  
  // 响应式数据
  const refKey = ref('border-box-8')
  const defaultColor = ref(['#235fa7', '#4fd2dd'])
  const mergedColor = ref([])
  
  const id = uuid()
  const path = ref(`border-box-8-path-${id}`)
  const gradient = ref(`border-box-8-gradient-${id}`)
  const mask = ref(`border-box-8-mask-${id}`)
  
  // 使用autoResize composable
  const { width, height } = useAutoResize(refKey)
  
  // 计算属性
  const length = computed(() => {
    return (width.value + height.value - 5) * 2
  })
  
  const pathD = computed(() => {
    if (props.reverse) {
      return `M 2.5, 2.5 L 2.5, ${height.value - 2.5} L ${width.value - 2.5}, ${height.value - 2.5} L ${width.value - 2.5}, 2.5 L 2.5, 2.5`
    }
    return `M2.5, 2.5 L${width.value - 2.5}, 2.5 L${width.value - 2.5}, ${height.value - 2.5} L2.5, ${height.value - 2.5} L2.5, 2.5`
  })
  
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
  .dv-border-box-8 {
    position: relative;
    width: 100%;
    height: 100%;
  
    .dv-border-svg-container {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0px;
      top: 0px;
    }
  
    .border-box-content {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
  </style>