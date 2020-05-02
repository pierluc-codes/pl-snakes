import { World } from './World'
import { Grid } from './Grid'
import { Snake, Direction } from './Snake'

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

    getProcessInputFunction() {
        return (e) => {
            console.log(e)
            switch (e.code) {
                case 'ArrowUp': // key up
                    this.world.snake.direction = Direction.North
                    break
                case 'ArrowDown': // key down
                    this.world.snake.direction = Direction.South
                    break
                case 'ArrowLeft': // key left
                    this.world.snake.direction = Direction.West
                    break
                case 'ArrowRight': // key right
                    this.world.snake.direction = Direction.East
                    break
            }
        }
    }

    update(currentLoopStartTime: number) {
        let delta = (currentLoopStartTime - this.lastModelUpdateTime)
        let tick = Math.floor(delta / 100)

        if (tick >= 1) {
            console.log("update")
            let snake = this.world.snake

            switch(snake.direction){
                case Direction.South:
                    this.world.snake.head.y = this.world.snake.head.y + (Grid.SQUARE_SIZE * tick)
                    break;
                case Direction.North:
                    this.world.snake.head.y = this.world.snake.head.y - (Grid.SQUARE_SIZE * tick)
                    break;
                case Direction.West:
                    this.world.snake.head.x = this.world.snake.head.x - (Grid.SQUARE_SIZE * tick)
                    break;
                case Direction.East:
                    this.world.snake.head.x = this.world.snake.head.x + (Grid.SQUARE_SIZE * tick)
                    break;
            }
            
            this.lastModelUpdateTime = currentLoopStartTime
            this.world.dirty = true
        }
    }

    render() {
        // console.log("render")
        /*this.canvasContext.save()*/
        this.world.render(this.canvas, this.canvasContext)
        /*this.canvasContext.restore()*/
    }

    start() {
        this.running = true
        this.scheduleNext()
    }

    loop(currentLoopStartTime) {
        // console.log("loop")
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
