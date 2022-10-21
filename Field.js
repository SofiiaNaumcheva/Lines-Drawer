import {Lines} from "./Line.js"
import {Points} from "./Point.js"
import {canvas, ctx, clearButton} from "./config.js"

class Field {

    constructor() 
    {
        //set canvas size
        canvas.width = window.innerWidth * 0.8
        canvas.height = window.innerHeight * 0.8

        //set classes instanceses
        this.lines = new Lines()
        this.points = new Points()

        //secondary variables
        this.creating = false
        this.curLine = {start: {x: 0, y: 0}, end: {x: 0, y: 0}}
        this.curIntersectionPoints = []

        //set listeners
        window.addEventListener(`resize`, Field.#changeCanvasSize)
        canvas.addEventListener(`mousemove`, Field.#mouseMove.bind(this))
        canvas.addEventListener(`mousedown`, Field.#mouseDown.bind(this))
        clearButton.addEventListener(`click`, Field.clearAll.bind(this))
    }

    static draw() {
        this.points.draw()
        this.lines.draw()   
    }

    //clear

    //main functions

    static clearAll () 
    {
        requestAnimationFrame(Field.#clearAnimation.bind(this))
    }

    //secondary functions

    static #clearAnimation() 
    {
        let distance = this.lines.Lines.reduce((acc, e) => 
        acc + Points.calcDistance(e.start, e.end), 0)

        if (distance > this.lines.Lines.length) {
            requestAnimationFrame(Field.#clearAnimation.bind(this))
            this.lines.clear(this)
            this.points.clear(this.lines.Lines)
        }
        else {
            this.lines.Lines = []
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

    // listeners
    //secondary functions

    static #mouseDown(e) {
        if (e.which == 3) {
            Field.#cancelLine (e)
        } else if (e.which == 1) {
        this.creating ? Field.#endLine.call(this, e) : Field.#startLine.call(this, e)
        }
    }
    
    static #mouseMove(e) 
    {
        if(this.creating) { 
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            this.curIntersectionPoints = []
    
            let location = Field.windowToCanvas({x: e.clientX, y: e.clientY})
            this.curLine.end = {...location}
    
            if(this.creating) Lines.drawLine(this.curLine)

            this.lines.Lines.map(e => this.curIntersectionPoints.push(Points.checkIntersection(e, this.curLine)))
            
            Field.draw.apply(this)   
        }
    }

    static #changeCanvasSize() 
    {
        canvas.width = window.innerWidth * 0.8
        canvas.height = window.innerHeight * 0.8 
    }

    static #cancelLine (e) 
    {
        this.creating = false
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        Field.draw()  
    }
    
    static #startLine (e) 
    {
        let location = Field.windowToCanvas({x: e.clientX, y: e.clientY})
        this.curLine = {start: {...location}, end: {...location}}
        this.creating = true
    }
    
    static #endLine (e) 
    {
        let location = Field.windowToCanvas({x: e.clientX, y: e.clientY})
        this.curLine.end = {...location}
        this.lines.Lines.push(this.curLine)
        this.points.Points.push(...this.curIntersectionPoints)
        this.creating = false
    }

    //coordinate transformation

    static windowToCanvas(coord)
    {
        let canvasBox = canvas.getBoundingClientRect()
        return {
            x: (coord.x - canvasBox.left)*(canvas.width/canvasBox.width),
            y: (coord.y - canvasBox.top)*(canvas.height/canvasBox.height)
        }
    }
}

export {Field}