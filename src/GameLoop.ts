import { World } from './World'
import { Grid } from './Grid'
import { Snake, Direction } from './Snake'
import { Cherry } from './Cherry'

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
        return (e: KeyboardEvent) => {
            let snake = this.world.snake

            console.log(e.code)

            switch (e.code) {
                case 'KeyW': // key up
                case 'ArrowUp': // key up
                    if (snake.direction != Direction.South) {
                        snake.direction = Direction.North
                    }
                    break
                case 'KeyS': // key up
                case 'ArrowDown': // key down
                    if (snake.direction != Direction.North) {
                        snake.direction = Direction.South
                    }
                    break
                case 'KeyA': // key up
                case 'ArrowLeft': // key left
                    if (snake.direction != Direction.East) {
                        snake.direction = Direction.West
                    }
                    break
                case 'KeyD': // key up
                case 'ArrowRight': // key right
                    if (snake.direction != Direction.West) {
                        snake.direction = Direction.East
                    }
                    break
            }
        }
    }

    update(currentLoopStartTime: number) {
        let delta = (currentLoopStartTime - this.lastModelUpdateTime)
        let tick = Math.floor(delta / 100)

        if (tick >= 1) {
            let snake = this.world.snake

            if (snake.alive) {
                snake.move(tick)
            }
            
            let cherry = this.world.cherry

            if (snake.isEating(cherry)) {
                console.log('cherry eated. nom nom nom!')
                snake.grow()
                this.world.cherry = new Cherry((Math.floor(Math.random()*41)) * 10, (Math.floor(Math.random()*41)) * 10)
            }

            if (this.world.isSnakeOfOufBound()) {
                snake.die()
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
