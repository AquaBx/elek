<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
import linkify from '@/global_scripts/linkify.js'
import drag from '@/global_scripts/drag.js'

let var_zoom = 1

function zoom(e){
  var_zoom += -e.deltaY/10000
  document.querySelector("body > #app > main").style.transform=`scale(${var_zoom}) translate(${e.pageX*(var_zoom-1)-window.innerWidth*(var_zoom-1)/10}px, ${e.pageY*(var_zoom-1)-window.innerHeight*(var_zoom-1)/10}px)`
}

document.body.addEventListener("wheel",zoom)

</script>

<template>
  <main style="position: relative;">
    <TheWelcome/>
  </main>
</template>

<style>
@import url("@/assets/base.css");
</style>
