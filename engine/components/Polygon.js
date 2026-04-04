class Polygon extends Component{
    points = []
    fillStyle = "black"
    strokeStyle = "transparent"
    lineWidth = 5

    draw(ctx){
        ctx.save()

        ctx.beginPath()

        for(const point of this.points){
            ctx.lineTo(point.x, point.y)
        }

        ctx.closePath()

        ctx.fillStyle = this.fillStyle
        ctx.strokeStyle = this.strokeStyle
        ctx.lineWidth = this.lineWidth

        ctx.stroke()
        ctx.fill()

        ctx.restore()
    }

    static generateCircle(segments){
        let points = []

        for (let i = 0; i < segments; i++) {
            let angle = (i / segments) * Math.PI * 2
            points.push(new Vector2(Math.cos(angle), Math.sin(angle)))
        }

        return points
    }
}
