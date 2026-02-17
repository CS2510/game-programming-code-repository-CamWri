class Polygon extends Component{
    points = []
    fillStyle = "black"
    strokeStyle = "transparent"
    lineWidth = 5

    draw(ctx){
        ctx.save()

        ctx.translate(this.transform.position.x, this.transform.position.y)

        ctx.beginPath()

        for(const point of this.points){
            ctx.lineTo(point.x * this.transform.scale.x, point.y * this.transform.scale.x)
        }

        ctx.closePath()

        ctx.fillStyle = this.fillStyle
        ctx.strokeStyle = this.strokeStyle
        ctx.lineWidth = this.lineWidth

        ctx.stroke()
        ctx.fill()

        ctx.restore()
    }
}
