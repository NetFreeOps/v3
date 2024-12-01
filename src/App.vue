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
   <Decoration12 style="width: 300px;height: 300px;" halo-dur="2" scan-dur="3">
    <span class="border-box-content">66%</span>
   </Decoration12>
   <Loading class="bx"/>
  </div>
</template>

<script setup>
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

</style>