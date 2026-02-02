class StatsComponent extends Component {
    constructor({
        hp = 10,
        maxHp = 10,
        speed = 1,
    } = {}) {
        super()
        this.hp = hp
        this.maxHp = maxHp
        this.speed = speed
    }
}