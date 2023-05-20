<script setup>

import linkify from "@/global_scripts/linkify.js"

let props = defineProps([
    "parentid",
    "id"
])





function link(){
    if (linkify.first_lin_el.node === linkify.second_lin_el.node) return
    if (linkify.first_lin_el.node === undefined || linkify.second_lin_el.node === undefined) return

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");

    linkify.draw(polyline,svg)

    svg.style.position = "absolute"
    svg.style.zIndex = "-1"

    svg.appendChild(polyline)
    document.querySelector("body > #app > main").appendChild(svg)

    linkify.polyline.push({
        first : linkify.first_lin_el.node,
        second : linkify.second_lin_el.node,
        path:polyline,
    })

    let i = linkify.polyline.length - 1 

    let tree1 = linkify.tree[linkify.first_lin_el.node.parentNode.id]
    let tree2 = linkify.tree[linkify.second_lin_el.node.parentNode.id]
 
    if(tree1 === undefined) { linkify.tree[linkify.first_lin_el.node.parentNode.id] = [] }
    if(tree2 === undefined) { linkify.tree[linkify.second_lin_el.node.parentNode.id] = [] }

    linkify.tree[linkify.first_lin_el.node.parentNode.id].push(i)
    linkify.tree[linkify.second_lin_el.node.parentNode.id].push(i)

    
}

function linkstart(){
    linkify.first_lin_el.node = document.querySelector(`#${props.parentid} #${props.id}`)
}

function linkstop(){
    linkify.second_lin_el.node = document.querySelector(`#${props.parentid} #${props.id}`)
    link()
}

</script>

<template>

    <div :id="id" @mousedown="linkstart()" @mouseup="linkstop()" style="position:absolute;width:5px;height:5px;display: block;background-color: black;border-radius: 9em;user-select: none;"></div>

</template>