<script setup>
import AncherPoint from '@/components/AncherPoint.vue';
import {defineProps} from "vue"
import drag from '@/global_scripts/drag.js'

let props = defineProps(["id","type"])

let icons = {

    "pile": {
        svg:"svg/pile.svg",
        anchors: [
            [{left:'-5px',top:'27.5px'},0],
            [{right:'-5px',top:'27.5px'},1],
        ]
    },
    "resistance": {
        svg:"svg/resistance.svg",
        anchors: [
            [{left:'-5px',top:'6.5px'},0],
            [{right:'-5px',top:'6.5px'},1],
        ]
    },
    "condensateur": {
        svg:"svg/condensateur.svg",
        anchors: [
            [{left:'-5px',top:'13.5px'},0],
            [{right:'-5px',top:'13.5px'},1],
        ]
    },
    "noeud": {
        svg:"svg/noeud.svg",
        anchors: [
            [{left:'0px',top:'0px'},0],
        ]
    }


}

let icon = icons[props.type]

</script>

<template>

    <div :id="id" style="display: block;z-index: 9;">
        
        <AncherPoint v-for="anc in icon.anchors" :style="anc[0]" :id='"anchor-"+anc[1]' v-bind:parentid="id"/>

        <img v-on:mousedown="drag.on_mouse_down" draggable="false" v-bind:src="icon.svg"/>

    </div>

</template>