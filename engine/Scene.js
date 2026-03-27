class Scene{
    gameObjects = []

    lastFrameMouseCollisions = []
    lastFrameCollisions = []
    previousMouseDowns = []

    instantiate(gameObject, position){
        this.gameObjects.push(gameObject)
        gameObject.components[0].position = position

        return gameObject
    }

    start() {
        for (const gameObject of this.gameObjects) {
            gameObject.start()
            gameObject.hasStarted = true
        }
    }

    update(){
        for(const gameObject of this.gameObjects){
            gameObject.broadCastMessage("fixedUpdate", [])
        }

        let thisFrameMouseCollisions = []
        let collidables = this.gameObjects.filter(go=>go.getComponent(Collider))
        let rigidBodies = this.gameObjects.filter(go => go.getComponent(RigidBody))

        if(Input.mousePosition){
            for(const collidable of collidables){
                if(Collisions.isCollisionPointGameObject(Input.mousePosition, collidable))
                    thisFrameMouseCollisions.push(collidable)
            }
        }
        for(const collidable of thisFrameMouseCollisions){
            if(this.lastFrameMouseCollisions.includes(collidable))
                collidable.broadCastMessage("onMouseOver")
            else
                collidable.broadCastMessage("onMouseEnter")
        }
        for(const collidable of this.lastFrameMouseCollisions){
            if(!thisFrameMouseCollisions.includes(collidable)){
                collidable.broadCastMessage("onMouseExit")
                this.previousMouseDowns = this.previousMouseDowns.filter(go=>go!=collidable)
            }
        }

        if(Input.mouseButtonsDownThisFrame.includes(0)){
            for(const collidable of thisFrameMouseCollisions){
                collidable.broadCastMessage("onMouseDown")
                if(!this.previousMouseDowns.includes(collidable)){
                    this.previousMouseDowns.push(collidable)
                }
            }
        }

        if(Input.mouseButtonsUpThisFrame.includes(0)){
            for(const collidable of thisFrameMouseCollisions){
                collidable.broadCastMessage("onMouseUp")
                if(this.previousMouseDowns.includes(collidable)){
                    collidable.broadCastMessage("onMouseUpAsButton")
                }
            }
            this.previousMouseDowns = []
        }

        if(Input.mouseButtonsDown.includes(0) && Input.mousePositionDelta?.magnitude != 0){
            // @ts-ignore
            const union = [...new Set([...thisFrameMouseCollisions, ...this.lastFrameMouseCollisions])]
            for(const collidable of union){
                collidable.broadCastMessage("onMouseDrag")
                if(this.lastFrameMouseCollisions.includes(collidable)
                     && !thisFrameMouseCollisions.includes(collidable)){
                    thisFrameMouseCollisions.push(collidable)
                }
            }
        }



        this.lastFrameMouseCollisions = thisFrameMouseCollisions
        const activeCollisions = []
        const rigidbodyCollisions = []

        for(let i = 0; i < collidables.length; i++){
            for(let j = i + 1; j < collidables.length; j++){
                const one = collidables[i]
                const two = collidables[j]
                if(!one.getComponent(RigidBody) && !two.getComponent(RigidBody))
                    continue
                const result = Collisions.isCollisionGameObjectGameObject(one, two)
                if(!result)
                    continue
                const collision = one.id < two.id ? {one: one, two: two, result: result} : {one:two, two: one, result: result.times(-1)}
                activeCollisions.push(collision)
            }
        }

        for(const collision of activeCollisions){
            let type = "onTrigger"
            if(!collision.one.getComponent(Collider)?.isTrigger && !collision.two.getComponent(Collider)?.isTrigger)
                type = "onCollision"
            if(this.lastFrameCollisions.some(pair=>pair.one == collision.one && pair.two == collision.two))
            {
                collision.one.broadCastMessage(type + "Stay", [collision.two, collision.result])
                collision.two.broadCastMessage(type + "Stay", [collision.one, collision.result.times(-1)])
            }
            else{
                collision.one.broadCastMessage(type + "Enter", [collision.two, collision.result])
                collision.two.broadCastMessage(type + "Enter", [collision.one, collision.result.times(-1)])
            }
            if(type == "onCollision"){
                rigidbodyCollisions.push(collision)
            }
        }

        for(const collision of this.lastFrameCollisions){
            let type = "onTrigger"
            if(!collision.one.getComponent(Collider)?.isTrigger && !collision.two.getComponent(Collider)?.isTrigger)
                type = "onCollision"
            if(!activeCollisions.some(pair=>pair.one == collision.one && pair.two == collision.two))
            {
                collision.one.broadCastMessage(type + "Exit", [collision.two, collision.result])
                collision.two.broadCastMessage(type + "Exit", [collision.one, collision.result.times(-1)])
            }
        }

        for(const rigidBody of rigidBodies){
            const rbCollisions = rigidbodyCollisions.filter(col => col.one == rigidBody || col.two == rigidBody)
            rbCollisions.sort((a, b) => b.result.magnitude - a.result.magnitude)
            for(const collision of rbCollisions){
                const result = Collisions.isCollisionGameObjectGameObject(collision.one, collision.two)
                if(!result) break
                if(collision.one.getComponent(RigidBody)){
                    collision.one.transform.position = collision.one.transform.position.add(collision.result.times(1))
                }
                else{
                     collision.two.transform.position = collision.two.transform.position.add(collision.result.times(-1))
                }
            }
        }

        this.lastFrameCollisions = activeCollisions

        for(const gameObject of this.gameObjects){
            if (!gameObject.hasStarted) {
                gameObject.start()
                gameObject.hasStarted = true
            }
        
            gameObject.update()
        }

        for(const gameObject of this.gameObjects){
            gameObject.components.filter(comp => comp.markForDestroy).forEach(comp => comp.onDestroy?.())

            gameObject.components = gameObject.components.filter(comp => !comp.markForDestroy)
        }

        this.gameObjects.filter(go => go.markForDestroy).forEach(go => go.broadCastMessage("onDestroy"))

        this.gameObjects = this.gameObjects.filter(go => !go.markForDestroy)
    }

    draw(ctx){
        for(const gameObject of this.gameObjects){
            gameObject.draw(ctx)
        }
    }
}

function instantiate(gameObject, position){
    return Engine.currentScene.instantiate(gameObject, position)
}