
let Logger=require("./logger.js")
let logger=new Logger()

logger.on('log',(message)=>{
    console.log(message)
})

logger.on('connect',(message)=>{
    console.error(message)
})

logger.log()