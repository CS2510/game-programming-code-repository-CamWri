class TextLabel extends Component{
    font = "20px Time"
    fillStyle = "black"
    text = "[No Text]"
    
    draw(ctx){
        ctx.save()

        ctx.font = this.font
        ctx.fillStyle = this.fillStyle
        ctx.fillText(this.text, 0, 0)

        ctx.restore()
    }
}