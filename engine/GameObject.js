class GameObject{
    components = []
    hasStarted = false
    markForDestroy = false
    name
    physicsStatic = false

    constructor(name){
        this.addComponent(new Transform())
        this.name = name
    }

    broadCastMessaege(message){
        for(const compoenent of this.components){
            compoenent[message]?.()
        }
    }

    addComponent(component, options){
        Object.assign(component, options)
        this.components.push(component)
        component.gameObject = this

        if(this.hasStarted){
            component.start?.()
        }

        return component
    }

    start() {
        this.broadCastMessaege("start")
    }

    update(){
        if (!this.hasStarted) {
            this.hasStarted = true
            this.start()
        }

        this.broadCastMessaege("update")
    }

    draw(ctx){
        for(const component of this.components){
            component.draw?.(ctx)
        }
    }

    destroy(){
        this.markForDestroy = true
        
        for (let component of this.components){
            component.destroy()
        }
    }

    getComponent(type){
        return this.components.find(c => c instanceof type)
    }

    get transform(){
        return this.components[0]
    }

    static find(name){
        return Engine.currentScene.gameObjects.find(go => go.name == name)
    }
}