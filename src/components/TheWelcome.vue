<script setup>
import Component from "./Component.vue";


</script>

<template>
  <div id="grid">
    <Component type="pile" id="parent-1"></Component>
    <Component type="condensateur" id="parent-3"></Component>
    <Component type="condensateur" id="parent-4"></Component>
    <Component type="noeud" id="parent-5"></Component>
  </div>
</template>

<style scoped>

  #grid > * {
    position: absolute;
    user-select: all;
  }

</style>