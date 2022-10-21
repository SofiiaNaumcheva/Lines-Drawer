import {config, ctx} from "./config.js"

class Points {
    constructor () 
    {
        this.Points = []
    }

    draw() 
    {
        this.Points.map(e => Points.drawPoint(e))
    }

    static drawPoint(e) 
    {
        ctx.beginPath()
        ctx.arc(e.x, e.y, config.intersectionPointRadius, 0, config.TWO_PI)
        ctx.fillStyle = config.intersectionPointColor
	    ctx.fill()
        ctx.lineWidth = config.intersectionPointLineWidth
	    ctx.strokeStyle = config.intersectionPointColor
        ctx.stroke()
        ctx.closePath()
    }

    //search intersections
    
    //main function
    static checkIntersection(l1, l2)
    {
        if(Points.#checkCrossing(l1.start, l1.end, l2.start, l2.end))
        {
            let koef_1 = [], koef_2 = []
            let intersectionPoint = {x: 0, y: 0}            

            koef_1  = Points.#doEquation(l2.start, l2.end)
            koef_2  = Points.#doEquation(l1.start, l1.end)
            
            intersectionPoint.x = Points.#getIntersectionX(...koef_1, ...koef_2)
            intersectionPoint.y = Points.#getIntersectionY(...koef_1, ...koef_2)

            Points.drawPoint(intersectionPoint)
            
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
    
        v1 = Points.#doVector(p4.x - p3.x, p4.y - p3.y, p1.x - p3.x, p1.y - p3.y)
        v2 = Points.#doVector(p4.x - p3.x, p4.y - p3.y, p2.x - p3.x, p2.y - p3.y)
        v3 = Points.#doVector(p2.x - p1.x, p2.y - p1.y, p3.x - p1.x, p3.y - p1.y)
        v4 = Points.#doVector(p2.x - p1.x, p2.y - p1.y, p4.x - p1.x, p4.y - p1.y)

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

    clear(lines) 
    {
        this.Points.map((point, index) => {
            let intersections = 0
            lines.map((line) => {
                if(Points.#chechPointOnLine(line, point)) ++intersections
            })
            if(intersections < 2) {
                this.Points.splice(index, 1)
            }
        })
    }

    //secondary functions

    static calcDistance(p1, p2) 
    {
        return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)
    }

    static #chechPointOnLine(line, point) 
    {
        return (Points.calcDistance(line.start, point) + Points.calcDistance(line.end, point)).toFixed(5) == (Points.calcDistance(line.start, line.end)).toFixed(5)
    }

}

export {Points}