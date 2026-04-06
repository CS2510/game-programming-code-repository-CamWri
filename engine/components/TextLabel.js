class TextLabel extends Component {
    font = "20px Time"
    fillStyle = "black"
    text = "[No Text]"

    draw(ctx) {
        ctx.save()

        ctx.font = this.font
        ctx.fillStyle = this.fillStyle

        const lines = this.text.split("\n")
        const lineHeight = parseInt(this.font)

        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], 0, i * lineHeight)
        }

        ctx.restore()
    }
}