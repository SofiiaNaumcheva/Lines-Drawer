let canvas = document.querySelector(`canvas`)
let ctx = canvas.getContext(`2d`)
let clearButton = document.querySelector(`#clear`)

const config = {
    intersectionPointRadius: 5,
    TWO_PI: Math.PI * 2,
    lineColor: 'rgb(0, 0, 0)',
    lineWidth: 0.5,
    intersectionPointColor: 'rgb(255, 0, 0)',
    animationSpeed: 0.03
    }

export {config, canvas, clearButton, ctx}
