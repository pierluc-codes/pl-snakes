console.log("hi")

var canvas, ctx;

window.onload = () => {
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    setInterval(draw, 1)
}

const draw = () => {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "green"
    ctx.fillRect(
        50,
        50,
        10,
        10
    )
}