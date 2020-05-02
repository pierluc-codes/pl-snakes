import { GameLoop } from './GameLoop'

var canvas, ctx;

window.onload = () => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    // setInterval(draw, 1)

    let gameLoop = new GameLoop(canvas, ctx, window)

    document.onkeydown = gameLoop.getProcessInputFunction()

    gameLoop.start()

    
}

const draw = () => {
    /*ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "green"
    ctx.fillRect(
        50,
        50,
        10,
        10
    )*/
}