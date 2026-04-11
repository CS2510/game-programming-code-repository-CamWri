class CharacterGameObject extends GameObject{
    constructor(name = "Character Game Object"){
        super(name, {tag: "entity"})

        this.addComponent(new Collider())
        this.addComponent(new RigidBody())
    }
}