import linkify from '@/global_scripts/linkify.js'

document.onmousemove = on_mouse_move;
document.onmouseup = on_mouse_up;

let el

function on_mouse_down(e) {
    el = e.target.parentNode
    el.style.zIndex = 10
    mouse_down=true;
}

let mouse_down = false;

function on_mouse_up(e){
    el.style.zIndex = 10
    mouse_down=false;
}

function on_mouse_move(event) {

    if (mouse_down === true) {

        if (el.id in linkify.tree) {
            for (let i of linkify.tree[el.id]){
                let polyline = linkify.polyline[i]
    
                linkify.draw(polyline.path,polyline.path.parentNode,polyline.first,polyline.second)
            }
        }

        let h = el.getBoundingClientRect().height/2;
        let w = el.getBoundingClientRect().width/2;

        el.style.left = event.clientX-w+'px';
        el.style.top = event.clientY-h+'px';
    }
} 

export default {
    on_mouse_down
}