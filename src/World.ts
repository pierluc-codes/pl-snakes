import { Snake } from './Snake'
import { Grid } from './Grid'

export class World {
    snake: Snake
    grid: Grid

    constructor(){
        this.snake = new Snake
        this.grid = new Grid()
    }

    render(canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.grid.render(canvas, ctx)
        this.snake.render(ctx)
    }
}