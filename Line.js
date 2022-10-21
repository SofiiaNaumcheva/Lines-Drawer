import {Field} from "./Field.js"
import {config, ctx, canvas} from "./config.js"

class Lines {
    constructor ()
    {
        this.Lines = []
    }

    draw() 
    {
        this.Lines.map(e => Lines.drawLine(e))
    }

    static drawLine(e) 
    {
        ctx.strokeStyle = config.lineColor
        ctx.lineWidth = config.lineWidth
        ctx.beginPath()
        ctx.moveTo(e.start.x, e.start.y)
        ctx.lineTo(e.end.x, e.end.y)
        ctx.stroke()
        ctx.closePath()
    }

    //clear

    //main functions

    clear(that) 
    {
        this.Lines.map(e => {
            let mid = {
                x: (e.start.x + e.end.x) / 2,
                y: (e.start.y + e.end.y) / 2
            }
            e.start = Lines.#lerp(e.start, mid, config.animationSpeed)
            e.end = Lines.#lerp(e.end, mid, config.animationSpeed)

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            Field.draw.apply(that)   
        })
    }

    //secondary functions

    static #lerp(start, end, amt) 
    {
        return {x: (1-amt)*start.x+amt*end.x, y: (1-amt)*start.y+amt*end.y}
    }
}


export {Lines}