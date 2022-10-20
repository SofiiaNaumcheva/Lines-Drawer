const canvas = document.querySelector(`canvas`)
const ctx = canvas.getContext(`2d`)
const clearButton = document.querySelector(`#clear`)

const config = {
    intersectionPointRadius: 5,
    TWO_PI: Math.PI * 2,
    lineColor: 'rgb(0, 0, 0)',
    lineWidth: 0.5,
    intersectionPointColor: 'rgb(255, 0, 0)'
    }

    function windowToCanvas(canvas, x,  y){
        let canvasBox = canvas.getBoundingClientRect()
        return {
            x: (x - canvasBox.left)*(canvas.width/canvasBox.width),
            y: (y - canvasBox.top)*(canvas.height/canvasBox.height)
        }
    }

    export {canvas, clearButton, config, ctx, windowToCanvas}
