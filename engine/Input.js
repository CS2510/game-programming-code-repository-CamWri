class Input{
    static keysDown = []

    static keyDown(event){
        Input.keysDown.push(event.code)
    }

    static keyUp(event){
        Input.keyDown = Input.keyDown.filter(
            function(element){
                if(element!=event){
                    return true
                } else {
                    return false
                }
            })
    }
}