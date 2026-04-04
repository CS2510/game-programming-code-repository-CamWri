class Polygon extends Component {
    points = []
    fillStyle = "black"
    strokeStyle = "transparent"
    lineWidth = 5

    draw(ctx) {
        ctx.save()

        ctx.beginPath()

        for (const point of this.points) {
            ctx.lineTo(point.x, point.y)
        }

        ctx.closePath()

        ctx.fillStyle = this.fillStyle
        ctx.fill()

        //Got this Idea/Implementation from ChatGPT
        const matrix = ctx.getTransform()
        const scaleX = Math.hypot(matrix.a, matrix.b)
        const scaleY = Math.hypot(matrix.c, matrix.d)
        const scale = (scaleX + scaleY) / 2

        ctx.lineWidth = this.lineWidth / scale
        ctx.strokeStyle = this.strokeStyle
        ctx.stroke()

        ctx.restore()
    }

    static generateCircle(segments) {
        let points = []

        for (let i = 0; i < segments; i++) {
            let angle = (i / segments) * Math.PI * 2
            points.push(new Vector2(Math.cos(angle), Math.sin(angle)))
        }

        return points
    }
}
