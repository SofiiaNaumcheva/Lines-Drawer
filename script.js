import {Line} from "./Line.js"
import {canvas, clearButton} from "./config.js"
import {changeCanvasSize, mouseMove, mouseDown} from "./listeners.js"

(() => {

function init() {
    canvas.width = window.innerWidth * 0.8
    canvas.height = window.innerHeight * 0.8
    Line.Lines = []
    Line.Points = []
}

init()

window.addEventListener(`resize`, changeCanvasSize)
canvas.addEventListener(`mousemove`, mouseMove)
canvas.addEventListener(`mousedown`, mouseDown)
clearButton.addEventListener(`click`, Line.clearAll)
})()