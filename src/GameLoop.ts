import { World } from './World'
import { Grid } from './Grid'

export class GameLoop {

    canvas: HTMLCanvasElement
    canvasContext: CanvasRenderingContext2D
    window: Window

    running: boolean
    world: World
    lastModelUpdateTime: number

    constructor(canvas: HTMLCanvasElement, canvasContext: CanvasRenderingContext2D, window: Window){
        this.canvas = canvas
        this.canvasContext = canvasContext
        this.window = window
        this.running = false
        this.world = new World()
        this.lastModelUpdateTime = 0;
    }

    processInput() {
        console.log("process input")
    }

    update(currentLoopStartTime: number) {
        let delta = (currentLoopStartTime - this.lastModelUpdateTime)
        let tick = Math.floor(delta / 1000)

        if (tick >= 1) {
            console.log("update")
            this.world.snake.head.y = this.world.snake.head.y + (Grid.SQUARE_SIZE * tick)
            this.lastModelUpdateTime = currentLoopStartTime
            this.world.dirty = true
        }
    }

    render() {
        console.log("render")
        /*this.canvasContext.save()*/
        this.world.render(this.canvas, this.canvasContext)
        /*this.canvasContext.restore()*/
    }

    start() {
        this.running = true
        this.scheduleNext()
    }

    loop(currentLoopStartTime) {
        console.log("loop")
        this.processInput()
        this.update(currentLoopStartTime)
        this.render()

        if (this.running) {
            this.scheduleNext()
        }
    }
 
    scheduleNext() {
        this.window.requestAnimationFrame((currentLoopStartTime: DOMHighResTimeStamp) => {this.loop(currentLoopStartTime)})
    }
}
