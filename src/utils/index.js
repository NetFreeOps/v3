import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 生成指定范围内的随机数
 */
export function randomExtend(minNum, maxNum) {
  if (arguments.length === 1) {
    return parseInt(Math.random() * minNum + 1, 10)
  } else {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
  }
}

/**
 * 防抖函数
 */
export function debounce(delay, callback) {
  let lastTime

  return function() {
    clearTimeout(lastTime)
    const [that, args] = [this, arguments]

    lastTime = setTimeout(() => {
      callback.apply(that, args)
    }, delay)
  }
}

/**
 * DOM 大小变化观察器
 */
export function observerDomResize(dom, callback) {
  const MutationObserver = window.MutationObserver || 
                          window.WebKitMutationObserver || 
                          window.MozMutationObserver

  const observer = new MutationObserver(callback)

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true
  })

  return observer
}

/**
 * 计算两点之间的距离
 */
export function getPointDistance(pointOne, pointTwo) {
  const minusX = Math.abs(pointOne[0] - pointTwo[0])
  const minusY = Math.abs(pointOne[1] - pointTwo[1])

  return Math.sqrt(minusX * minusX + minusY * minusY)
}

/**
 * 生成UUID
 */
export function uuid(hasHyphen) {
  const template = hasHyphen ? 
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 
    'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'

  return template.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 深度合并对象
 * @param {Object} target 目标对象 
 * @param {Object} merged 要合并的对象
 * @returns {Object} 合并后的对象
 */
export function deepMerge(target, merged) {
    // 如果没有要合并的对象,直接返回目标对象
    if (!merged || typeof merged !== 'object') return target
    
    // 遍历要合并的对象的所有属性
    for (const key in merged) {
      // 如果目标对象该属性也是对象,递归合并
      if (target[key] && typeof target[key] === 'object') {
        deepMerge(target[key], merged[key])
        continue
      }
  
      // 如果要合并的属性是对象,进行深拷贝
      if (typeof merged[key] === 'object') {
        target[key] = deepClone(merged[key], true)
        continue
      }
  
      // 基本类型直接赋值
      target[key] = merged[key]
    }
  
    return target
  }

  /**
 * 深拷贝对象或数组
 * @param {Object|Array} object 要克隆的对象
 * @param {Boolean} recursion 是否递归克隆
 * @returns {Object|Array} 克隆后的对象
 */
export function deepClone(object, recursion = false) {
    // 如果是null或undefined直接返回
    if (!object) return object
    
    // 如果不需要递归,使用JSON方法快速克隆
    if (!recursion) {
      return JSON.parse(JSON.stringify(object))
    }
  
    // 根据源对象类型创建新的容器
    const clonedObj = Array.isArray(object) ? [] : {}
  
    // 如果是对象类型则递归克隆
    if (object && typeof object === 'object') {
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          if (object[key] && typeof object[key] === 'object') {
            clonedObj[key] = deepClone(object[key], true)
          } else {
            clonedObj[key] = object[key]
          }
        }
      }
    }
  
    return clonedObj
  }

  /**
 * 计算折线总长度
 * @param {Array} points 点位数组 [[x1,y1], [x2,y2], ...]
 * @returns {number} 折线总长度
 */
export function getPolylineLength(points) {
  // 将点位数组转换为线段数组
  const lineSegments = new Array(points.length - 1)
    .fill(0)
    .map((_, i) => [points[i], points[i + 1]])

  // 计算每个线段的长度
  const lengths = lineSegments.map(([point1, point2]) => 
    getTwoPointDistance(point1, point2)
  )

  // 返回所有线段长度之和
  return lengths.reduce((total, length) => total + length, 0)
}

/**
 * 计算两点之间的距离
 * @param {Array} point1 点1坐标 [x1, y1]
 * @param {Array} point2 点2坐标 [x2, y2] 
 * @returns {number} 两点间距离
 */
function getTwoPointDistance([x1, y1], [x2, y2]) {
  const minusX = Math.abs(x1 - x2)
  const minusY = Math.abs(y1 - y2)
  return Math.sqrt(minusX * minusX + minusY * minusY)
}

/**
 * 获取圆上指定弧度的点坐标
 * @param {number} x 圆心x坐标
 * @param {number} y 圆心y坐标
 * @param {number} radius 圆半径
 * @param {number} radian 弧度值
 * @returns {Array} 目标点坐标 [x, y]
 */
export function getCircleRadianPoint(x, y, radius, radian) {
  const { cos, sin } = Math
  return [
    x + cos(radian) * radius,
    y + sin(radian) * radius
  ]
}

/**
 * 获取正多边形的顶点坐标
 * @param {number} rx 中心点x坐标
 * @param {number} ry 中心点y坐标
 * @param {number} r 外接圆半径
 * @param {number} side 边数
 * @param {number} minus 起始角度(弧度)，默认为 -PI/2
 * @returns {Array} 顶点坐标数组 [[x1,y1], [x2,y2], ...]
 */
export function getRegularPolygonPoints(rx, ry, r, side, minus = Math.PI * -0.5) {
  // 计算每个顶点之间的弧度间隔
  const radianGap = Math.PI * 2 / side
  
  // 计算每个顶点的弧度值
  const radians = new Array(side)
    .fill(0)
    .map((_, i) => i * radianGap + minus)
  
  // 转换弧度值为坐标点
  return radians.map(radian => 
    getCircleRadianPoint(rx, ry, r, radian)
  )
}