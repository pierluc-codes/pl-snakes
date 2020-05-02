import { Snake } from './Snake'
import { Grid } from './Grid'

export class World {
    snake: Snake
    grid: Grid
    dirty: boolean

    constructor(){
        this.snake = new Snake
        this.grid = new Grid()
        this.dirty = true
    }

    render(canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        if (this.dirty) {
            this.grid.render(canvas, ctx)
            this.snake.render(ctx)
            this.dirty = false
        }
    }
}