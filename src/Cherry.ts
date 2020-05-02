import { Grid } from './Grid'

export class Cherry {
    x: number
    y: number
    color: string

    constructor(x, y){
        this.x = x
        this.y = y
        this.color = "red"
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.fillRect(
            this.x,
            this.y,
            Grid.SQUARE_SIZE,
            Grid.SQUARE_SIZE
        )
    }
}