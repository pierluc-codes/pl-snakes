import { Cherry } from './Cherry'
import { Grid } from './Grid'
import { Snake } from './Snake'

export class World {
    cherry: Cherry
    snake: Snake
    grid: Grid
    dirty: boolean

    constructor(){
        this.snake = new Snake
        this.cherry = new Cherry(150, 150)
        this.grid = new Grid()
        this.dirty = true
    }

    render(canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        if (this.dirty) {
            this.grid.render(canvas, ctx)
            this.snake.render(ctx)
            this.cherry.render(ctx)
            this.dirty = false
        }
    }

    isSnakeOfOufBound() {
        let head = this.snake.head
        return head.x < 0 || head.y < 0 || (head.x > 40 * Grid.SQUARE_SIZE) || (head.y > 40 * Grid.SQUARE_SIZE)
    }
}