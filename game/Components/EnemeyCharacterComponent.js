class EnemeyCharacterComponent extends Component{
    constructor(){
        super()
    }

    start(){

    }

    draw(ctx){
        ctx.save()
        ctx.translate(this.transform.position.x, this.transform.position.y)

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, 50)
        ctx.lineTo(-50, 50)
        ctx.lineTo(-50, 0)
        ctx.closePath()


        ctx.lineWidth = 5
        ctx.strokeStyle = "red"
        ctx.stroke()

        ctx.fillStyle = "black"
        ctx.fill()

        ctx.restore()
    }
}