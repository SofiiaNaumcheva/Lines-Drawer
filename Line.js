import {canvas, config, ctx} from "./config.js"

export class Line 
{
    Lines = []
    Points = []

    constructor (start, end) 
    {
            this.start = start || {x: 0, y: 0}
            this.end = end || {x: 0, y: 0}
    }

    //draw elements
    drawLine() 
    {
        ctx.strokeStyle = config.lineColor
        ctx.lineWidth = config.lineWidth
        ctx.beginPath()
        ctx.moveTo(this.start.x, this.start.y)
        ctx.lineTo(this.end.x, this.end.y)
        ctx.stroke()
        ctx.closePath()
    }

    static drawAllLines() 
    {
        Line.Lines.map(e => e.drawLine())
    }

    static drawPoint(e) 
    {
        ctx.beginPath()
        ctx.arc(e.x, e.y, config.intersectionPointRadius, 0, config.TWO_PI)
        ctx.fillStyle = config.intersectionPointColor
	    ctx.fill()
        ctx.lineWidth = 1
	    ctx.strokeStyle = config.intersectionPointColor
        ctx.stroke()
        ctx.closePath()
    }

    static drawAllPoints() 
    {
        Line.Points.map(e => Line.drawPoint(e))
    }

    //search intersections
    
    //main function
    static checkIntersection(l1, l2)
    {
        if(Line.#checkCrossing(l1.start, l1.end, l2.start, l2.end))
        {
            let koef_1 = [], koef_2 = []
            let intersectionPoint = {x: 0, y: 0}
            let intersectionX, intersectionY
            

            koef_1  = Line.#doEquation(l2.start, l2.end)
            koef_2  = Line.#doEquation(l1.start, l1.end)
            
            intersectionPoint.x = Line.#getIntersectionX(...koef_1, ...koef_2)
            intersectionPoint.y = Line.#getIntersectionY(...koef_1, ...koef_2)

            Line.drawPoint(intersectionPoint)
            
            return intersectionPoint    
        } else {
            return false
        }
    }

    //secondary functions 

    static #doVector(ax, ay, bx, by)
    {
        return ax * by - bx * ay
    }

    static #checkCrossing(p1,p2,p3,p4)
    {
        let v1, v2, v3, v4
    
        v1 = Line.#doVector(p4.x - p3.x, p4.y - p3.y, p1.x - p3.x, p1.y - p3.y)
        v2 = Line.#doVector(p4.x - p3.x, p4.y - p3.y, p2.x - p3.x, p2.y - p3.y)
        v3 = Line.#doVector(p2.x - p1.x, p2.y - p1.y, p3.x - p1.x, p3.y - p1.y)
        v4 = Line.#doVector(p2.x - p1.x, p2.y - p1.y, p4.x - p1.x, p4.y - p1.y)

        if(v1 * v2 < 0 && v3 * v4 < 0) return true
        else return false
    }

    static #doEquation(p1 , p2) 
    {
        let A, B, C
        A = p2.y - p1.y                                        
        B = p1.x - p2.x
        C = -p1.x * (p2.y - p1.y) + p1.y * (p2.x - p1.x)
        return [A, B, C]
    }

    static #getIntersectionX(a1, b1, c1, a2, b2, c2)
    {
        return (-c1 * b2 + b1 * c2) / (a1 * b2 - b1 * a2)
    }

    static #getIntersectionY(a1, b1, c1, a2, b2, c2)
    {
        return (-a1 * c2 + c1 * a2) / (a1 * b2 - b1 * a2)
    }

    //clear

    //main functions

    static #clearAnimation() 
    {
        let distance = Line.Lines.reduce((acc, e) => 
        acc + Line.#calcDistance(e.start, e.end), 0)

        if (distance > Line.Lines.length) {
            requestAnimationFrame(Line.#clearAnimation)
            Line.#clearLines()
            Line.#clearPoints()
        }
        else {
            Line.Lines = []
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

    static clearAll () 
    {
        requestAnimationFrame(Line.#clearAnimation)
    }

    //secondary functions

    static #lerp(start, end, amt) 
    {
        return {x: (1-amt)*start.x+amt*end.x, y: (1-amt)*start.y+amt*end.y}
    }

    static #calcDistance(p1, p2) 
    {
        return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)
    }

    static #chechPointOnLine(line, point) 
    {
        return (Line.#calcDistance(line.start, point) + Line.#calcDistance(line.end, point)).toFixed(5) == (Line.#calcDistance(line.start, line.end)).toFixed(5)
    }

    static #clearLines() 
    {
        Line.Lines.map(e => {
            let mid = {
                x: (e.start.x + e.end.x) / 2,
                y: (e.start.y + e.end.y) / 2
            }
            e.start = Line.#lerp(e.start, mid, 0.03)
            e.end = Line.#lerp(e.end, mid, 0.03)

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            Line.drawAllLines()
            Line.drawAllPoints()    
        })
    }

    static #clearPoints() 
    {
        Line.Points.map((point, index) => {
            let intersections = 0
            Line.Lines.map((line) => {
                if(Line.#chechPointOnLine(line, point)) ++intersections
            })
            if(intersections < 2) {
                Line.Points.splice(index, 1)
            }
        })
    }
}