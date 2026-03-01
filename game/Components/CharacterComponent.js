class CharacterComponent extends Component{
    hasPriority = false
    
    // Stats keyword: value
    stats = {"Speed": 100, "MaxMovement": 350, "RemainingMovement": 350, "MaxHealth": 16, "CurrentHealth": 16}

    abilities

    abilitiyCooldowns = new Map()

    activeAbility = null
    canPassTurn = true

    constructor(){
        super()
    }

    start(){
        for (const key in this.abilities) {
            this.abilitiyCooldowns.set(this.abilities[key], 0)
        }
    }

    endTurn(){
        this.abilitiyCooldowns.forEach((value, key, map) => {
            map.set(key, Math.max(0, value - 1));
        });

        this.stats["RemainingMovement"] = this.stats["MaxMovement"]

        Engine.currentScene.gameObjects.find(a => a instanceof TurnManagerGameObject).components.find(b => b instanceof TurnManagerComponent).endTurn()
    }

    applyDamage(damageAmount){
        this.stats["CurrentHealth"] = Math.min(0, this.stats["CurrentHealth"] - damageAmount)
    }
}