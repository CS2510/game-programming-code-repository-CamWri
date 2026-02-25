class Scene{
    gameObjects = []

    lastFrameMouseCollisions = []
    previousMouseDown = []

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
        let thisFrameMouseCollisions = []
        let collidables = this.gameObjects.filter(go => go.getComponent(Collider))

        if(Input.mousePosition){
            for(const collidable of collidables){
                if(Collisions.isCollisionPointGameObject(Input.mousePosition, collidable)){
                    thisFrameMouseCollisions.push(collidable)
                }
            }
        }

        for(const collidable of thisFrameMouseCollisions){
            if(this.lastFrameMouseCollisions.includes(collidable)){
                collidable.broadCastMessaege("onMouseOver")
            } else {
                collidable.broadCastMessaege("onMouseEnter")    
            }
        }

        for(const collidable of this.lastFrameMouseCollisions){
            if(!thisFrameMouseCollisions.includes(collidable)){
                collidable.broadCastMessaege("onMouseExit")
                this.previousMouseDown = this.previousMouseDown.filter(go => go != collidable)
            }
        }

        if(Input.mouseButtonsDownThisFrame.includes(0)){
            for(const collidable of thisFrameMouseCollisions){
                collidable.broadCastMessaege("onMouseDown")
                if(!this.previousMouseDown.includes(collidable)){
                    this.previousMouseDown.push(collidable)
                }
            }
        }

        if(Input.mouseButtonsUpThisFrame.includes(0)){
            for(const collidable of thisFrameMouseCollisions){
                collidable.broadCastMessaege("onMouseUp")
                if(this.previousMouseDown.includes(collidable)){
                    collidable.broadCastMessaege("onMouseUpAsButton")
                }
            }
            this.previousMouseDown = []
        }

        if(Input.mouseButtonsDown.includes(0) && Input.mousePositionDelta?.magnitude != 0){
            // @ts-ignore
            const union = [...new Set([...thisFrameMouseCollisions, this.lastFrameMouseCollisions])]
            for(const collidable of union){
                collidable.broadCastMessaege("onMouseDrag")
                if(this.lastFrameMouseCollisions.includes(collidable) && !thisFrameMouseCollisions.includes(collidable)){
                    thisFrameMouseCollisions.push(collidable)
                }
            }
        }

        this.lastFrameMouseCollisions = thisFrameMouseCollisions

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

        this.gameObjects.filter(go => go.markForDestroy).forEach(go => go.broadCastMessaege("onDestroy"))

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