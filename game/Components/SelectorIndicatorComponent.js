class SelectorIndicatorComponent extends Component{
    constructor(){
        super()
    }

    draw(ctx){
        ctx.save()
        ctx.translate(this.transform.position.x, this.transform.position.y)

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(-10, -10)
        ctx.lineTo(10, -10)
        ctx.closePath()

        ctx.lineWidth = 5
        ctx.strokeStyle = "red"
        ctx.stroke()

        ctx.fillStyle = "black"
        ctx.fill()

        ctx.restore()
    }
}