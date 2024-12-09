<template>
  <div class="dv-water-pond-level">
    <svg v-if="renderer">
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop v-for="lc in svgBorderGradient" :key="lc[0]"
            :offset="lc[0]"
            :stop-color="lc[1]" />
        </linearGradient>
      </defs>

      <text
        :stroke="`url(#${gradientId})`"
        :fill="`url(#${gradientId})`"
        :x="renderer.area[0] / 2 + 8"
        :y="renderer.area[1] / 2 + 8"
      >
        {{ details }}
      </text>

      <ellipse v-if="!shape || shape === 'round'"
        :cx="renderer.area[0] / 2 + 8"
        :cy="renderer.area[1] / 2 + 8"
        :rx="renderer.area[0] / 2 + 5"
        :ry="renderer.area[1] / 2 + 5"
        :stroke="`url(#${gradientId})`" />

      <rect v-else
        x="2" y="2"
        :rx="shape === 'roundRect' ? 10 : 0"
        :ry="shape === 'roundRect' ? 10 : 0"
        :width="renderer.area[0] + 12"
        :height="renderer.area[1] + 12"
        :stroke="`url(#${gradientId})`" />
    </svg>

    <canvas ref="water-pond-level" :style="`border-radius: ${radius};`" />
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount,getCurrentInstance  } from 'vue'
import { uuid } from '../../utils/index'
import { deepMerge } from '../../utils/index'
import { deepClone } from '../../utils/index'
import CRender from '@jiaminghi/c-render'

const props = defineProps({
  config: Object,
  default: () => ({})
})

const id = uuid()
const gradientId = `water-level-pond-${id}`

const defaultConfig = {
  data: [],
  shape: 'rect',
  waveNum: 3,
  waveHeight: 40,
  waveOpacity: 0.4,
  colors: ['#3DE7C9', '#00BAFF'],
  formatter: '{value}%'
}

const mergedConfig = ref({})
const renderer = ref(null)
const svgBorderGradient = ref([])
const details = ref('')
const waves = ref([])
const animation = ref(false)

const radius = computed(() => {
  const { shape } = mergedConfig.value
  if (shape === 'round') return '50%'
  if (shape === 'rect') return '0'
  if (shape === 'roundRect') return '10px'
  return '0'
})

const shape = computed(() => {
  const { shape } = mergedConfig.value
  return shape || 'rect'
})

watch(() => props.config, () => {
  const { calcData } = useMethods()
  renderer.value.delAllGraph()
  waves.value = []
  setTimeout(calcData, 0)
})

const useMethods = () => {
  const init = () => {
    initRender()
    if (!props.config) return
    calcData()
  }

//   const initRender = () => {
//     const { $refs } = getCurrentInstance()
//     renderer.value = new CRender($refs['water-pond-level'])
//   }

const initRender = () => {
    const instance = getCurrentInstance()
    if (instance && instance.refs && instance.refs['water-pond-level']) {
      renderer.value = new CRender(instance.refs['water-pond-level'])
    } else {
      console.error('Ref water-pond-level not found')
    }
  }

  const calcData = () => {
    mergeConfig()
    calcSvgBorderGradient()
    calcDetails()
    addWave()
    animationWave()
   
  }

  const mergeConfig = () => {
    mergedConfig.value = deepMerge(deepClone(defaultConfig, true), props.config)
  }

  const calcSvgBorderGradient = () => {
    const { colors } = mergedConfig.value
    const colorNum = colors.length
    const colorOffsetGap = 100 / (colorNum - 1)
    svgBorderGradient.value = colors.map((c, i) => [colorOffsetGap * i, c])
  }

  const calcDetails = () => {
    const { data, formatter } = mergedConfig.value
    if (!data.length) {
      details.value = ''
      return
    }
    const maxValue = Math.max(...data)
    details.value = formatter.replace('{value}', maxValue)
  }

  const addWave = () => {
    const { getWaveShapes, getWaveStyle, drawed } = useMethods()
    const shapes = getWaveShapes()
    const style = getWaveStyle()
    waves.value = shapes.map(shape => renderer.value.add({
      name: 'smoothline',
      animationFrame: 300,
      shape,
      style,
      drawed
    }))
  }

  const getWaveShapes = () => {
    const { waveNum, waveHeight, data } = mergedConfig.value
    const [w, h] = renderer.value.area
    const pointsNum = waveNum * 4 + 4
    const pointXGap = w / waveNum / 2

    return data.map(v => {
      let points = new Array(pointsNum).fill(0).map((foo, j) => {
        const x = w - pointXGap * j
        const startY = (1 - v / 100) * h
        const y = j % 2 === 0 ? startY : startY - waveHeight
        return [x, y]
      })
      points = points.map(p => mergeOffset(p, [pointXGap * 2, 0]))
      return { points }
    })
  }

  const mergeOffset = ([x, y], [ox, oy]) => {
    return [x + ox, y + oy]
  }

  const getWaveStyle = () => {
    const h = renderer.value.area[1]
    return {
      gradientColor: mergedConfig.value.colors,
      gradientType: 'linear',
      gradientParams: [0, 0, 0, h],
      gradientWith: 'fill',
      opacity: mergedConfig.value.waveOpacity,
      translate: [0, 0]
    }
  }

  const drawed = ({ shape: { points } }, { ctx, area }) => {
    const firstPoint = points[0]
    const lastPoint = points.slice(-1)[0]
    const h = area[1]
    ctx.lineTo(lastPoint[0], h)
    ctx.lineTo(firstPoint[0], h)
    ctx.closePath()
    ctx.fill()
  }

  const animationWave = async (repeat = 1) => {
    if (animation.value) return
    animation.value = true
    const w = renderer.value.area[0]
    waves.value.forEach(graph => {
      graph.attr('style', { translate: [0, 0] })
      graph.animation('style', {
        translate: [w, 0]
      }, true)
    })
    await renderer.value.launchAnimation()
    animation.value = false
    if (!renderer.value.graphs.length) return
    animationWave(repeat + 1)
  }

  return {
    init,
    calcData,
    drawed,
    animationWave,
    getWaveShapes,
    getWaveStyle
  }
}

onMounted(() => {
  const { init } = useMethods()
  init()
})

onBeforeUnmount(() => {
  const { delAllGraph } = useMethods()
  renderer.value.delAllGraph()
  waves.value = []
})
</script>

<style lang="less">
.dv-water-pond-level {
  position: relative;

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  }

  text {
    font-size: 25px;
    font-weight: bold;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  ellipse, rect {
    fill: none;
    stroke-width: 3;
  }

  canvas {
    margin-top: 8px;
    // margin-left: 8px;
    width: calc(~"100% - 16px");
    height: calc(~"100% - 16px");
    box-sizing: border-box;
  }
}
</style>