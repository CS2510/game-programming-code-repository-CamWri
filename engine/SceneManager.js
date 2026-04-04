class SceneManager{
    static currentScene
    static nextScene

    static update(){
        if(SceneManager.nextScene){
            for(const gameObject of SceneManager.getActiveScene()){
                gameObject.broadCastMessage("OnDestroy")()
            }
            SceneManager.currentScene = new SceneManager.nextScene()
            SceneManager.nextScene = undefined
        }
    }

    static loadScene(newScene, addative = false){
        if(!addative){
            SceneManager.nextScene = newScene
        } else {
            const scene = new newScene()
            for(const gameObject of scene.gameObjects){
                SceneManager.currentScene.gameObjects.push(gameObject)
            }
        }
    }

    static getActiveScene(){
        return SceneManager.currentScene
    }
}