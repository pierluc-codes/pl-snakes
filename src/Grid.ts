export class Grid {
    static readonly SQUARE_SIZE = 10

    color: string

    constructor() {
        this.color = "black"
    }

    render(canvas:any, ctx: any) {
        ctx.fillStyle = this.color
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}