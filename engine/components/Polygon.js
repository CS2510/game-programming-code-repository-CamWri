class Polygon extends Component{
    points = []
    fillStyle = "black"
    strokeStyle = "transparent"
    linewidth = 5

    draw(ctx){
        ctx.save()

        ctx.translate(this.transform.position.x, this.transform.position.y)

        ctx.beginPath()

        for(const point of this.points){
            ctx.lineTo(point.x, point.y)
        }

        ctx.closePath()

        ctx.fillStyle = this.fillStyle
        ctx.strokeStyle = this.strokeStyle
        ctx.linewidth = this.linewidth

        ctx.stroke()
        ctx.fill()

        ctx.restore()
    }
}
