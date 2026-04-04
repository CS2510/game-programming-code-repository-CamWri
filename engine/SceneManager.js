class SceneManager {
    static currentScene
    static nextScene

    static update() {
        if (SceneManager.nextScene) {
            for (const gameObject of SceneManager.getActiveScene()) {
                gameObject.broadCastMessage("OnDestroy")()
            }
            SceneManager.currentScene = new SceneManager.nextScene()
            SceneManager.nextScene = undefined
        }
    }

    static loadScene(newScene, addative = false) {
        if (!addative) {
            SceneManager.nextScene = newScene
            console.log(newScene)
        } else {
            const addativeScene = new newScene()
            for (const gameObject of addativeScene.gameObjects) {
                gameObject.scene = addativeScene
                SceneManager.currentScene.gameObjects.push(gameObject)
            }
        }
    }

    static getActiveScene() {
        return SceneManager.currentScene
    }
}