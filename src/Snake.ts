import { Grid } from './Grid'
import { Cherry } from './Cherry'

export class Snake {
    head: SnakeBodyPart
    bodyPart: Array<SnakeBodyPart>
    color: string
    headColor: string
    direction: Direction
    alive: boolean

    constructor() {
        this.color = "green"
        this.headColor = "orange"
        this.head = new SnakeBodyPart(50, 50, this.color)
        this.direction = Direction.South
        this.bodyPart = []
        this.alive = true
    }

    render(ctx: CanvasRenderingContext2D) {
        this.head.render(ctx)
        this.bodyPart.forEach(p =>{
            p.render(ctx)
        })
    }

    isEating(cherry: Cherry){
        return this.head.x == cherry.x && this.head.y == cherry.y
    }

    die() {
        this.alive = false
    }
    
    isEatingItself(){
        let head = this.head
        return this.bodyPart.some(p => {
            return p.x == this.head.x && p.y == this.head.y
        })
    }

    move(tick: number) {
        let currentHead = this.head

        let newHead

        switch(this.direction){
            case Direction.South:
                newHead =  new SnakeBodyPart(currentHead.x, currentHead.y + (Grid.SQUARE_SIZE * tick), this.headColor)
                break;
            case Direction.North:
                newHead =  new SnakeBodyPart(currentHead.x, currentHead.y - (Grid.SQUARE_SIZE * tick), this.headColor)
                break;
            case Direction.West:
                newHead =  new SnakeBodyPart(currentHead.x - (Grid.SQUARE_SIZE * tick), currentHead.y, this.headColor)
                break;
            case Direction.East:
                newHead =  new SnakeBodyPart(currentHead.x + (Grid.SQUARE_SIZE * tick), currentHead.y, this.headColor)
                break;
        }

        currentHead.color = this.color

        this.bodyPart.push(currentHead)
        this.bodyPart.shift()
        this.head = newHead

        if (this.isEatingItself()) {
            this.die()
        }
    }

    grow() {
        this.bodyPart.push(this.head)
        this.head = new SnakeBodyPart(this.head.x, this.head.y, this.color)
    }
}

class SnakeBodyPart {
    x: number
    y: number
    color: string

    constructor(x: number, y: number, color: string){
        this.x = x
        this.y = y
        this.color = color
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

export enum Direction {
    North = 1,
    West,
    East,
    South
}