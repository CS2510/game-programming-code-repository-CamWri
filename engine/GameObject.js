class GameObject{
    components = []
    hasStarted = false

    constructor(){
        this.addComponent(new Transform())
    }

    addComponent(component){
        this.components.push(component)
        component.gameObject = this
    }

    start() {
        for (const component of this.components) {
            component.start()
        }
    }

    update(){
        for(const component of this.components){
            component.update?.()
        }
    }

    draw(ctx){
        for(const component of this.components){
            component.draw?.(ctx)
        }
    }

    get transform(){
        return this.components[0]
    }
}