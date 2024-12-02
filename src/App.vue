<template>
  <div class="container">
   <BorderBox1 class="bx"/>
   <BorderBox2 class="bx"/>
   <BorderBox3 class="bx"/>
   <BorderBox4 class="bx"/>
   <BorderBox5 class="bx"/>
   <BorderBox6 class="bx"/>
   <BorderBox7 class="bx"/>
   <BorderBox8 class="bx"/>
   <BorderBox9 class="bx"/>
   <BorderBox10 class="bx"/>
   <BorderBox11 title="边框11" class="bx"></BorderBox11>
   <BorderBox12 class="bx"/>
   <BorderBox13 class="bx"/>
   <Decoration1 class="bx"/>
   <Decoration2 class="bx"/>
   <Decoration2 :reverse="true" class="bx"/>
   <Decoration3 class="bx"/>
   <Decoration4 class="bx"/> 
   <Decoration4 :reverse="true" class="bx"/>
   <Decoration5  style="width: 300px;height:100px;"/>
   <Decoration6 class="bx"/>
   <Decoration7 style="width: 300px;height: 300px;">
    <span class="border-box-content">66%</span>
   </Decoration7>
   <Decoration8 class="bx"/>
   <Decoration8 :reverse="true" class="bx"/>
   <Decoration9 style="width: 300px;height: 300px;">
    <span class="border-box-content">66%</span>
  </Decoration9>
   <Decoration10 class="bx"/>
   <Decoration11 style="width: 300px;height: 100px;">
    <span class="border-box-content">66%</span>
   </Decoration11>
   <Decoration12 style="width: 300px;height: 300px;" :halo-dur="2" :scan-dur="3">
    <span class="border-box-content">66%</span>
   </Decoration12>
   <Loading class="bx"/>
   <WaterLevelPond :config="config1"  style="width: 150px;height: 200px;"/>
   <WaterLevelPond :config="config2"  style="width: 150px;height: 200px;"/>
   <WaterLevelPond :config="config3"  style="width: 150px;height: 200px;"/>
   
   <Modal1 :title="title" v-model:visible="visible1"/>
   <Modal2 :title="title" v-model:visible="visible2"/>
   <Modal3 :title="title" v-model:visible="visible3"/>
   <Modal4 :title="title" v-model:visible="visible4"/>

   <div class="btn-container">
    <button @click="visible1 = !visible1" class="btn">弹窗1</button>
    <button @click="visible2 = !visible2" class="btn">弹窗2</button>
    <button @click="visible3 = !visible3" class="btn">弹窗3</button>
    <button @click="visible4 = !visible4" class="btn">弹窗4</button>
   </div>




  </div>
</template>

<script setup>
import { ref } from 'vue'
import BorderBox1 from './components/BorderBox1/index.vue'
import BorderBox2 from './components/BorderBox2/index.vue'
import BorderBox3 from './components/BorderBox3/index.vue'
import BorderBox4 from './components/BorderBox4/index.vue'
import BorderBox5 from './components/BorderBox5/index.vue'
import BorderBox6 from './components/BorderBox6/index.vue'
import BorderBox7 from './components/BorderBox7/index.vue'
import BorderBox8 from './components/BorderBox8/index.vue'
import BorderBox9 from './components/BorderBox9/index.vue'
import BorderBox10 from './components/BorderBox10/index.vue'
import BorderBox11 from './components/BorderBox11/index.vue'
import BorderBox12 from './components/BorderBox12/index.vue'
import BorderBox13 from './components/BorderBox13/index.vue'
import Decoration1 from './components/Decoration1/index.vue'
import Decoration2 from './components/Decoration2/index.vue'
import Decoration3 from './components/Decoration3/index.vue'
import Decoration4 from './components/Decoration4/index.vue'
import Decoration5 from './components/Decoration5/index.vue'
import Decoration6 from './components/Decoration6/index.vue'
import Decoration7 from './components/Decoration7/index.vue'
import Decoration8 from './components/Decoration8/index.vue'
import Decoration9 from './components/Decoration9/index.vue'
import Decoration10 from './components/Decoration10/index.vue'
import Decoration11 from './components/Decoration11/index.vue'
import Decoration12 from './components/Decoration12/index.vue'
import Loading from './components/Loading/index.vue'
import WaterLevelPond from './components/WaterLevelPond/index.vue'
import Modal1 from './components/Modal1/index.vue'
import Modal2 from './components/Modal2/index.vue'
import Modal3 from './components/Modal3/index.vue'
import Modal4 from './components/Modal4/index.vue'

const config1 = {
  data:[55],
  shape:'round',
  //colors:['#00a854','#006738'],
  waveNum:5,
  waveHeight:10,
  waveOpacity:0.4,
  formatter:'{value}%'
}
const config2 = {
  data:[66,55],
  shape:'roundRect',
  formatter:'{value}%'
}
const config3 = {
  data:[66],
  shape:'rect ',
  formatter:'{value}%'
}
const title = ref('标题')
const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
</script>

<style scoped>
.container {
 display: flex;
 flex-wrap: wrap;
  background-color: black;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
}
.bx{
  width: 500px;
  height: 200px;
}
.border-box-content {
      color: rgb(66,185,131);
      font-size: 40px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }
.btn{
  /* position: absolute;
  top: 10px;
  left: 10px; */
  width: 150px;
  height: 40px;
  padding: 12px 24px;
  background: linear-gradient(45deg, #42b983, #33a06f);
  color: #ffffff;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(66, 185, 131, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(66, 185, 131, 0.4);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px rgba(66, 185, 131, 0.2);
  }
}
.btn-container{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
