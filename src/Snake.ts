import { Grid } from './Grid'

export class Snake {
    head: SnakeHead
    color: string
    direction: Direction

    constructor() {
        this.head = new SnakeHead(50, 50)
        this.color = "green"
        this.direction = Direction.North
    }

    render(ctx: CanvasRenderingContext2D) {
        console.log('rendering snake')
        ctx.fillStyle = this.color
        ctx.fillRect(
            this.head.x,
            this.head.y,
            Grid.SQUARE_SIZE,
            Grid.SQUARE_SIZE
        )
    }
}

class SnakeHead {
    x: number
    y: number

    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }
}

export enum Direction {
    North = 1,
    West,
    East,
    South
}