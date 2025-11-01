const EventEmitter=require('events')

class Logger extends EventEmitter{
    
    log(message){
        console.log(message)
        this.emit('log',{message:"Kullanıcının log kaydı tutuldu"})
        this.emit('connect','String mesaj connecti')
    }

}

module.exports =Logger