import { reactive } from "vue";

let first_lin_el = reactive({"node":undefined})
let second_lin_el = reactive({"node":undefined})

let tree = reactive({})
let polyline = reactive([])

function draw (polyline, svg, el_1=first_lin_el.node, el_2=second_lin_el.node) {

    
    let pos_1 = el_1.getBoundingClientRect()
    let pos_2 = el_2.getBoundingClientRect()


    let dx,dy
    let x,y



    if ( pos_2.left > pos_1.left && pos_2.top > pos_1.top){ /* Cas où le 1 est en haut à gauche du 2 */
        x = pos_2.left - pos_1.left
        y = pos_2.top - pos_1.top
        dx = pos_1.left
        dy = pos_1.top
        polyline.setAttribute("points",`2.5,2.5  ${x+2.5},${y+2.5}`)
    }
    else if ( pos_2.left < pos_1.left && pos_2.top < pos_1.top){ /* Cas où le 1 est en bas à droite du 2 */
    x = pos_1.left - pos_2.left
    y = pos_1.top - pos_2.top
    dx = pos_2.left
    dy = pos_2.top
    polyline.setAttribute("points",`2.5,2.5 ${x+2.5},${y+2.5}`)
    }
    else if ( pos_2.left < pos_1.left && pos_2.top > pos_1.top){ /* Cas où le 1 est en haut à droite du 2 */
        x = pos_1.left - pos_2.left
        y = pos_2.top - pos_1.top
        dx = pos_2.left
        dy = pos_1.top
        polyline.setAttribute("points",`2.5,${y+2.5} ${x+2.5},2.5`)
    }
    else { /* Cas où le 1 est en bas à gauche du 2 */
        x = pos_2.left - pos_1.left
        y = pos_1.top - pos_2.top
        dx = pos_1.left
        dy = pos_2.top
        polyline.setAttribute("points",`${x+2.5},2.5 2.5,${y+2.5}`)
    }

    polyline.setAttribute("stroke","red")
    polyline.setAttribute("stroke-width","5")
    polyline.setAttribute("stroke-linejoin","round")
    polyline.setAttribute("fill","transparent")

    svg.setAttribute('viewBox',`0 0 ${x+5} ${y+5}`)
    
    svg.style.width = x+5
    svg.style.height = y+5
    svg.style.left = dx
    svg.style.top = dy
}

export default {
    first_lin_el,
    second_lin_el,
    tree,
    polyline,
    draw,
}