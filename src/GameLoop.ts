import { World } from './World'
import { Grid } from './Grid'

export class GameLoop {

    canvas: any
    canvasContext: any

    running: boolean
    world: World

    constructor(canvas: any, canvasContext: any){
        this.canvas = canvas
        this.canvasContext = canvasContext
        this.running = false
        this.world = new World()
    }

    processInput() {
        console.log("process input")
    }

    update() {
        console.log("update")
        this.world.snake.head.x = this.world.snake.head.x + Grid.SQUARE_SIZE
    }

    render() {
        console.log("render")
        this.world.render(this.canvas, this.canvasContext)
    }

    scheduleNext() {
        let gameLoop = this as GameLoop
        if (this.running) {
            window.setTimeout(() => {gameLoop.loop()}, 1000) // TODO RELATIVE NUMBER
        }
    }

    start() {
        this.running = true
        this.scheduleNext()
    }

    loop() {
        this.processInput()
        this.update()
        this.render()
        this.scheduleNext()
    }
}
