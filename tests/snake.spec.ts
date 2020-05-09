import { Direction, Snake, SnakeBodyPart } from '../src/Snake'
import { Cherry } from '../src/Cherry'

import * as chai from 'chai'

const should = chai.should()

describe("snake", () => {
    let snake: Snake

    beforeEach(() => {
        snake = new Snake()
        snake.head = new SnakeBodyPart(50, 50, "black")
    })

    it("should die", () => {
        snake.die()
        snake.alive.should.be.false
    })

    it("should eat a cherry", () => {
        let cherry = new Cherry(50, 50)
        snake.isEating(cherry).should.be.true

        cherry = new Cherry(1, 1)
        snake.isEating(cherry).should.be.false
    })

    it("should know when it eat itself", () => {
        snake.bodyPart.push(new SnakeBodyPart(50 ,50, "black"))
        snake.isEatingItself().should.be.true

        snake.head = new SnakeBodyPart(5, 5, "black")
        snake.isEatingItself().should.be.false
    })

    it("should grow", () =>{
        let currentHead = snake.head
        snake.grow()
        snake.head.should.not.be.equal(currentHead)
        snake.bodyPart.indexOf(currentHead).should.be.above(-1)
        snake.bodyPart.length.should.be.equal(1)
    })

    it("should move...", () => {
        it("north", () => {
            snake.direction = Direction.North
            snake.move(1)
            snake.head.should.be.equal(new SnakeBodyPart(50, 49, "black"))
        })

        it("south", () => {
            snake.direction = Direction.North
            snake.move(1)
            snake.head.should.be.equal(new SnakeBodyPart(50, 51, "black"))
        })

        it("west", () => {
            snake.direction = Direction.North
            snake.move(1)
            snake.head.should.be.equal(new SnakeBodyPart(49, 50, "black"))
        })

        it("east", () => {
            snake.direction = Direction.North
            snake.move(1)
            snake.head.should.be.equal(new SnakeBodyPart(51, 50, "black"))
        })
    })
})