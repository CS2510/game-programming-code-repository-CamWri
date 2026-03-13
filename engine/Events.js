class Events{
    static listeners = []

    static registerListener(message, listeningClass){
        Events.listeners.push({message, listeningClass})
    }

    static unregisterListener(message, listeningClass){
        Events.listeners = Events.listeners.filter(
            listener => !(listener.message === message && listener.listeningClass === listeningClass)
        )
    }

    static unregisterAllListeners(listeningClass){
        Events.listeners = Events.listeners.filter(
            listener => listener.listeningClass !== listeningClass
        )
    }

    static handleEvent(message, args){
        for(const listener of Events.listeners){
            if(listener.message == message){
                listener.listeningClass.handleEvent(message, args)
            }
        }
    }
}