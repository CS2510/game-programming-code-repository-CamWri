class SpellRangeIndicatorComponent extends Component{
    spellRange = new Vector2(500, 500)
    constructor(){
        super()
    }

    start(){
        this.transform.scale = this.spellRange
    }
}