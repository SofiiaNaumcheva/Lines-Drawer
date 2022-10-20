import {canvas, ctx, windowToCanvas} from "./config.js"
import {Line} from "./Line.js"

let curLine = new Line()
let creating = false
let location
let curIntersectionPoints

//listeners
function mouseDown(e) {
    if (e.which == 3) {
        cancelLine (e)
    } else if (e.which == 1) {
    creating ? endLine(e) : startLine(e)
    }
}

function mouseMove(e) 
{
    if(creating) { 
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        curIntersectionPoints = []

        location = windowToCanvas(canvas, e.clientX, e.clientY)
        curLine.end = {...location}

        if(creating) curLine.drawLine()
        
        Line.drawAllLines()
        Line.Lines.map(e => curIntersectionPoints.push(Line.checkIntersection(e, curLine)))
        Line.drawAllPoints()   
    }
}

function changeCanvasSize () 
{
    canvas.width = window.innerWidth * 0.8
    canvas.height = window.innerHeight * 0.8 
}

//secondary functions
function cancelLine (e) {
    creating = false
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    Line.drawAllLines()
    Line.drawAllPoints()  
}

function startLine (e) {
    location = windowToCanvas(canvas, e.clientX, e.clientY)
    curLine = new Line ({...location}, {...location})
    creating = true
}

function endLine (e) {
    location = windowToCanvas(canvas, e.clientX, e.clientY)
    curLine.end = {...location}
    Line.Lines.push(curLine)
    Line.Points.push(...curIntersectionPoints)
    creating = false
}

export {changeCanvasSize, mouseMove, mouseDown}